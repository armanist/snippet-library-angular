import {
  EMPTY,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { Component, OnInit, signal } from '@angular/core';
import { SnippetList } from './snippets/snippet-list/snippet-list';
import { SnippetForm } from './snippets/snippet-form/snippet-form';
import { SnippetStore } from './snippets/services/snippet-store';
import { Toast } from './shared/toast/toast';
import { FormsModule } from '@angular/forms';
import { ConfirmDialog } from './shared/confirm-dialog/confirm-dialog';
import type { Snippet, SnippetDraft } from './snippets/snippet.model';
import type { ToastType } from './shared/toast/toast';

@Component({
  selector: 'app-root',
  imports: [FormsModule, SnippetList, SnippetForm, Toast, ConfirmDialog],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  snippets = signal<Snippet[]>([]);
  isLoading = signal(true);
  searchTerm = '';
  toastMessage = '';
  toastType: ToastType = 'success';
  deleteDialogVisible = false;
  pendingDeleteId: string | null = null;
  pendingDeleteTitle = '';

  private readonly searchChanges = new Subject<string>();

  constructor(private readonly store: SnippetStore) { }

  ngOnInit(): void {
    this.searchChanges
      .pipe(
        map((search) => search.trim()),
        debounceTime(300),
        startWith(this.searchTerm.trim()),
        distinctUntilChanged(),
        switchMap((search) => {
          this.isLoading.set(true);

          return this.store
            .load({ search, page: 1, limit: 20 })
            .pipe(
              catchError((error: unknown) => {
                console.error('Angular faild to load snippets:', error);
                this.isLoading.set(false);
                this.toastMessage = 'Could not load snippets.';
                this.toastType = 'error';
                return EMPTY;
              }),
            );
        }),
      )
      .subscribe((response) => {
        this.snippets.set(response.snippets);
        this.isLoading.set(false);
      });
  }

  handleSearchChange(search: string): void {
    this.searchTerm = search;
    this.searchChanges.next(search);
  }

  handleSnippetSubmitted(draft: SnippetDraft): void {
    this.store.add(draft).subscribe({
      next: () => {
        this.snippets.set(this.store.getAll());
        this.toastMessage = 'Snippet added.';
        this.toastType = 'success';
      },
      error: () => {
        this.toastMessage = 'Could not add snippet.';
        this.toastType = 'error';
      },
    });
  }

  handleValidationError(message: string): void {
    this.toastMessage = message;
    this.toastType = 'error';
  }

  handleSnippetDelete(id: string): void {
    const snippet = this.snippets().find(
      (currentSnippet) => currentSnippet.id === id,
    );

    if (!snippet) {
      return;
    }

    this.pendingDeleteId = id;
    this.pendingDeleteTitle = snippet.title;
    this.deleteDialogVisible = true;
  }

  handleDeleteConfirmed(): void {
    if (!this.pendingDeleteId) {
      return;
    }

    const snippetId = this.pendingDeleteId;

    this.store.remove(snippetId).subscribe({
      next: () => {
        this.snippets.set(this.store.getAll());
        this.toastMessage = 'Snippet deleted.';
        this.toastType = 'success';
        this.closeDeleteDialog();
      },
      error: () => {
        this.toastMessage = 'Could not delete snippet.';
        this.toastType = 'error';
      },
    });
  }

  closeDeleteDialog(): void {
    this.deleteDialogVisible = false;
    this.pendingDeleteId = null;
    this.pendingDeleteTitle = '';
  }
}

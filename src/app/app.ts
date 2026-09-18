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

  constructor(private readonly store: SnippetStore) {}

  ngOnInit(): void {
    this.store.load().subscribe({
      next: (snippets) => {
        this.snippets.set(snippets);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Angular failed to load snippets:', error);
        this.isLoading.set(false);
        this.toastMessage = 'Could not load snippets.';
        this.toastType = 'error';
      },
    });
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

  get filteredSnippets(): Snippet[] {
    const snippets = this.snippets();
    const query = this.searchTerm.trim().toLowerCase();

    if (!query) {
      return snippets;
    }

    return snippets.filter((snippet) => {
      const searchableText = [
        snippet.title,
        snippet.language,
        snippet.code,
        ...snippet.tags,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
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

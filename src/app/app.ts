import {
  EMPTY,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  merge,
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
import { Pagination } from './shared/pagination/pagination';
import type { ToastType } from './shared/toast/toast';
import type {
  Snippet,
  SnippetDraft,
  SnippetPagination,
  SnippetListQuery
} from './snippets/snippet.model';

@Component({
  selector: 'app-root',
  imports: [FormsModule, SnippetList, SnippetForm, Toast, ConfirmDialog, Pagination],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  snippets = signal<Snippet[]>([]);
  pagination = signal<SnippetPagination | null>(null)
  isLoading = signal(true);
  searchTerm = '';
  toastMessage = '';
  toastType: ToastType = 'success';
  deleteDialogVisible = false;
  pendingDeleteId: string | null = null;
  pendingDeleteTitle = '';

  private readonly listQueries = new Subject<SnippetListQuery>();

  private readonly refreshQueries = new Subject<SnippetListQuery>();

  private readonly pageSize = 2;

  constructor(private readonly store: SnippetStore) { }

  ngOnInit(): void {
    merge(
      this.listQueries
        .pipe(
          debounceTime(300),
          startWith({
            search: this.searchTerm.trim(),
            page: 1,
            limit: this.pageSize,
          }),
          distinctUntilChanged((previous, current) =>
            previous.search === current.search &&
            previous.page === current.page &&
            previous.limit === current.limit,
          ),
        ),
      this.refreshQueries,
    )
      .pipe(
        switchMap((query) => {
          this.isLoading.set(true);

          return this.store
            .load(query)
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
        this.pagination.set(response.pagination);
        this.isLoading.set(false);
      });
  }

  handleSearchChange(search: string): void {
    this.searchTerm = search;
    this.listQueries.next({
      search: search.trim(),
      page: 1,
      limit: this.pagination()?.limit ?? this.pageSize,
    });
  }

  handlePageChange(page: number): void {
    const currentPagination = this.pagination();

    if (!currentPagination || page < 1 || page > currentPagination.totalPages) {
      return;
    }

    this.listQueries.next({
      search: this.searchTerm.trim(),
      page,
      limit: currentPagination.limit
    });
  }

  refreshCurrentPage(page?: number): void {
    const currentPagination = this.pagination();

    this.refreshQueries.next({
      search: this.searchTerm.trim(),
      page: page ?? currentPagination?.page ?? 1,
      limit: currentPagination?.limit ?? this.pageSize,
    });
  }

  handleSnippetSubmitted(draft: SnippetDraft): void {
    this.store.add(draft).subscribe({
      next: () => {
        this.refreshCurrentPage();
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

    const currentPage = this.pagination()?.page ?? 1;

    const isCurrentPageEmpty = this.snippets().length === 1;

    const pageAfterDelete =
    isCurrentPageEmpty && currentPage > 1
      ? currentPage - 1
      : currentPage;

    this.store.remove(snippetId).subscribe({
      next: () => {
        this.refreshCurrentPage(pageAfterDelete);
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

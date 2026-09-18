import { Component } from '@angular/core';
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
  styleUrl: './app.css'
})
export class App {
  snippets: Snippet[];
  searchTerm = '';
  toastMessage = '';
  toastType: ToastType = 'success';
  deleteDialogVisible = false;
  pendingDeleteId: string | null = null;
  pendingDeleteTitle = '';

  constructor(private readonly store: SnippetStore) {
    this.snippets = this.store.getAll();
  }

  handleSnippetSubmitted(draft: SnippetDraft): void {
    this.store.add(draft);
    this.snippets = this.store.getAll();

    this.toastMessage = 'Snippet added.';
    this.toastType = 'success';
  }

  handleValidationError(message: string): void {
    this.toastMessage = message;
    this.toastType = 'error';
  }

  get filteredSnippets(): Snippet[] {
    const query = this.searchTerm.trim().toLowerCase();

    if (!query) {
      return this.snippets;
    }

    return this.snippets.filter((snippet) => {
      const searchableText = [
        snippet.title,
        snippet.language,
        snippet.code,
        ...snippet.tags
      ].join(' ').toLowerCase();

      return searchableText.includes(query);
    });
  }

  handleSnippetDelete(id: string): void {
    const snippet = this.snippets.find((currentSnippet) => currentSnippet.id === id);

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

    this.store.remove(this.pendingDeleteId);
    this.snippets = this.store.getAll();

    this.toastMessage = 'Snippet deleted.';
    this.toastType = 'success';

    this.closeDeleteDialog();
  }

  closeDeleteDialog(): void {
    this.deleteDialogVisible = false;
    this.pendingDeleteId = null;
    this.pendingDeleteTitle = '';
  }

}
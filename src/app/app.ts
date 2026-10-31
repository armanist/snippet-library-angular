import { Component, signal } from '@angular/core';
import { SnippetList } from './snippets/snippet-list/snippet-list';
import { SnippetForm } from './snippets/snippet-form/snippet-form';
import { SnippetStore } from './snippets/services/snippet-store';
import { SnippetChanges } from './snippets/services/snippet-changes';
import { Toast } from './shared/toast/toast';
import { ConfirmDialog } from './shared/confirm-dialog/confirm-dialog';
import { ToastService } from './shared/toast/toast-service';
import { ConfirmDialogService } from './shared/confirm-dialog/confirm-dialog-service';
import type { Snippet } from './snippets/contracts/snippet';
import type { SnippetDraft } from './snippets/contracts/create-snippet';

@Component({
  selector: 'app-root',
  imports: [SnippetList, SnippetForm, Toast, ConfirmDialog],
  templateUrl: './app.html',
})
export class App {
  editingSnippet = signal<Snippet | null>(null);

  constructor(
    private readonly store: SnippetStore,
    protected readonly toast: ToastService,
    protected readonly confirmDialog: ConfirmDialogService,
    protected readonly changes: SnippetChanges,
  ) { }

  handleSnippetSubmitted(draft: SnippetDraft): void {
    const snippetToEdit = this.editingSnippet();

    const saveRequest = snippetToEdit
      ? this.store.update(snippetToEdit.id, draft)
      : this.store.add(draft);

    saveRequest.subscribe({
      next: () => {
        this.editingSnippet.set(null);
        this.changes.notify();

        let message = snippetToEdit
          ? 'Snippet updated.'
          : 'Snippet added.';

        this.toast.showSuccess(message);
      },
      error: () => {
        let message = snippetToEdit
          ? 'Could not update snippet.'
          : 'Could not add snippet.';

        this.toast.showError(message);
      }
    });
  }

  handleEditCanceled(): void {
    this.editingSnippet.set(null);
  }

  handleDeleteConfirmed(): void {
    const snippetId = this.confirmDialog.pendingId();

    if (!snippetId) {
      return;
    }

    this.store.remove(snippetId).subscribe({
      next: () => {
        this.changes.notify();

        this.toast.showSuccess('Snippet deleted.');

        this.confirmDialog.close();
      },
      error: () => {
        this.toast.showError('Could not delete snippet.');
      },
    });
  }
}

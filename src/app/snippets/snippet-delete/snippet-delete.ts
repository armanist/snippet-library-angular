import { Injectable, inject } from "@angular/core";
import { ConfirmDialogService } from "../../shared/confirm-dialog/confirm-dialog-service";
import { ToastService } from "../../shared/toast/toast-service";
import { SnippetChanges } from "../services/snippet-changes";
import { SnippetStore } from "../services/snippet-store";

@Injectable({
    providedIn: 'root'
})
export class SnippetDelete {
    private readonly store = inject(SnippetStore);
    private readonly toast = inject(ToastService);
    private readonly changes = inject(SnippetChanges);
    private readonly confirmDialog = inject(ConfirmDialogService);

    confirm(): void {
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
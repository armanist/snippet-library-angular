import { Injectable, inject } from "@angular/core";
import { ConfirmDialogService } from "../../shared/confirm-dialog/confirm-dialog-service";
import { ToastService } from "../../shared/toast/toast-service";
import { SnippetChanges } from "../services/snippet-changes";
import { SNIPPET_DATA_SOURCE } from "../contracts/snippet-data-source";

@Injectable({
    providedIn: 'root'
})
export class SnippetDelete {
    private readonly dataSource = inject(SNIPPET_DATA_SOURCE);
    private readonly toast = inject(ToastService);
    private readonly changes = inject(SnippetChanges);
    private readonly confirmDialog = inject(ConfirmDialogService);

    confirm(): void {
        const snippetId = this.confirmDialog.pendingId();

        if (!snippetId) {
            return;
        }

        this.dataSource.delete(snippetId).subscribe({
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
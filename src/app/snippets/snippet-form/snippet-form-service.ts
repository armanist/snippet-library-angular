import { Injectable, inject, signal } from "@angular/core";
import { ToastService } from "../../shared/toast/toast-service";
import { SnippetChanges } from "../services/snippet-changes";
import { SnippetStore } from "../services/snippet-store";
import type { SnippetDraft } from "../contracts/create-snippet";
import type { Snippet } from "../contracts/snippet";

@Injectable({
    providedIn: 'root'
})
export class SnippetFormService {
    private readonly store = inject(SnippetStore);
    private readonly toast = inject(ToastService);
    private readonly changes = inject(SnippetChanges);

    private readonly editingSnippetState = signal<Snippet | null>(null);

    readonly editingSnippet = this.editingSnippetState.asReadonly();

    startEdit(snippet: Snippet): void {
        this.editingSnippetState.set(snippet);
    }

    cancelEdit(): void {
        this.editingSnippetState.set(null);
    }

    submit(draft: SnippetDraft): void {
        const snippetToEdit = this.editingSnippetState();

        const saveRequest = snippetToEdit
            ? this.store.update(snippetToEdit.id, draft)
            : this.store.add(draft);

        saveRequest.subscribe({
            next: () => {
                this.cancelEdit();
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
}
import { Component } from '@angular/core';
import { SnippetList } from './snippets/snippet-list/snippet-list';
import { SnippetForm } from './snippets/snippet-form/snippet-form';
import { SnippetFormService } from './snippets/snippet-form/snippet-form-service';
import { Toast } from './shared/toast/toast';
import { ConfirmDialog } from './shared/confirm-dialog/confirm-dialog';
import { ToastService } from './shared/toast/toast-service';
import { ConfirmDialogService } from './shared/confirm-dialog/confirm-dialog-service';
import { SnippetDelete } from './snippets/snippet-delete/snippet-delete';

@Component({
  selector: 'app-root',
  imports: [SnippetList, SnippetForm, Toast, ConfirmDialog],
  templateUrl: './app.html',
})
export class App {
  constructor(
    protected readonly toast: ToastService,
    protected readonly confirmDialog: ConfirmDialogService,
    protected readonly snippetForm: SnippetFormService,
    protected readonly snippetDelete: SnippetDelete,
  ) { }
}

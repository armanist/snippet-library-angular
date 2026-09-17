import { Component } from '@angular/core';
import { SnippetList } from './snippets/snippet-list/snippet-list';
import { SnippetForm } from './snippets/snippet-form/snippet-form';
import { SnippetStore } from './snippets/services/snippet-store';
import { Toast } from './shared/toast/toast';
import { FormsModule } from '@angular/forms';
import type { Snippet, SnippetDraft } from './snippets/snippet.model';
import type { ToastType } from './shared/toast/toast';

@Component({
  selector: 'app-root',
  imports: [FormsModule, SnippetList, SnippetForm, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  snippets: Snippet[];
  searchTerm = '';
  toastMessage = '';
  toastType: ToastType = 'success';

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

    if(!query) {
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

}
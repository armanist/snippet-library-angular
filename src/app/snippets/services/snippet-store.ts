import { Injectable } from '@angular/core';
import { exampleSnippets } from '../example-snippets';
import type { Snippet, SnippetDraft } from '../snippet.model';

@Injectable({
  providedIn: 'root',
})

export class SnippetStore {
  private snippets: Snippet[] = [...exampleSnippets];

  getAll(): Snippet[] {
    return [...this.snippets];
  }

  add(draft: SnippetDraft): Snippet {
    const snippet: Snippet = {
      id: crypto.randomUUID(),
      ...draft,
      createdAt: new Date().toISOString(),
    };

    this.snippets = [snippet, ...this.snippets];

    return snippet;
  }
}

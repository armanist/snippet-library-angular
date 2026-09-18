import { Injectable } from '@angular/core';
import { exampleSnippets } from '../example-snippets';
import { SnippetStorage } from './snippet-storage';
import type { Snippet, SnippetDraft } from '../snippet.model';

@Injectable({
  providedIn: 'root',
})

export class SnippetStore {
  private snippets: Snippet[] = [...exampleSnippets];

  constructor(private readonly storage: SnippetStorage) {
    const storedSnippets = this.storage.load();

    this.snippets = storedSnippets ?? [...exampleSnippets];
  }

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
    this.storage.save(this.snippets);

    return snippet;
  }

  remove(id: string): void {
    this.snippets = this.snippets.filter((snippet) => snippet.id !== id);

    this.storage.save(this.snippets);
  }
}

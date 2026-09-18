import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SnippetApi } from './snippet-api';
import type { Snippet, SnippetDraft } from '../snippet.model';

@Injectable({
  providedIn: 'root',
})
export class SnippetStore {
  private snippets: Snippet[] = [];

  constructor(private readonly api: SnippetApi) {}

  getAll(): Snippet[] {
    return [...this.snippets];
  }

  load(): Observable<Snippet[]> {
    return this.api.getAll().pipe(
      tap((snippets) => {
        this.snippets = snippets
      })
    );
  }

  add(draft: SnippetDraft): Observable<Snippet> {
    return this.api.create(draft).pipe(
      tap((snippet) => {
        this.snippets = [snippet, ...this.snippets];
      })
    );
  }

  remove(id: string): Observable<void> {
    return this.api.delete(id).pipe(
      tap(() => this.snippets = this.snippets.filter((snippet) => snippet.id !== id))
    );
  }
}

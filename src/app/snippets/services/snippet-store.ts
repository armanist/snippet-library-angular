import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SnippetApi } from './snippet-api';
import type { 
  Snippet, 
  SnippetDraft, 
  SnippetListResponse,
  SnippetListQuery } from '../snippet.model';

@Injectable({
  providedIn: 'root',
})
export class SnippetStore {

  constructor(private readonly api: SnippetApi) {}

  load(query: SnippetListQuery): Observable<SnippetListResponse> {
    return this.api.getAll(query);
  }

  add(draft: SnippetDraft): Observable<Snippet> {
    return this.api.create(draft);
  }

  remove(id: string): Observable<void> {
    return this.api.delete(id);
  }
}

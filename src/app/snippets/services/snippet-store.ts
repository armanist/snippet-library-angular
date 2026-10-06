import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SNIPPET_DATA_SOURCE } from '../contracts/snippet-data-source';
import type { Snippet } from '../contracts/snippet';
import type { SnippetDraft } from '../contracts/create-snippet';
import type { SnippetUpdate } from '../contracts/update-snippet';
import type { SnippetListResponse, SnippetListQuery } from '../contracts/find-snippet';

@Injectable({
  providedIn: 'root',
})
export class SnippetStore {
  private readonly dataSource = inject(SNIPPET_DATA_SOURCE)

  load(query: SnippetListQuery): Observable<SnippetListResponse> {
    return this.dataSource.getAll(query);
  }

  add(draft: SnippetDraft): Observable<Snippet> {
    return this.dataSource.create(draft);
  }

  update(id: string, changes: SnippetUpdate): Observable<Snippet> {
    return this.dataSource.update(id, changes);
  }

  remove(id: string): Observable<void> {
    return this.dataSource.delete(id);
  }
}

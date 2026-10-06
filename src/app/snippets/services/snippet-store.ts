import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SNIPPET_DATA_SOURCE } from '../contracts/snippet-data-source';
import type {
  Snippet,
  SnippetDraft,
  SnippetListResponse,
  SnippetListQuery,
  SnippetUpdate,
} from '../snippet.model';

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

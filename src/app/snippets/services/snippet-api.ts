import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import type {
  Snippet,
  SnippetDraft,
  SnippetListQuery,
  SnippetListResponse
} from '../snippet.model';

@Injectable({
  providedIn: 'root',
})
export class SnippetApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/snippets';

  getAll(query: SnippetListQuery): Observable<SnippetListResponse> {
    let params = new HttpParams();

    if (query.search !== undefined) {
      params = params.set('search', query.search);
    }

    if (query.page !== undefined) {
      params = params.set('page', query.page);
    }

    if (query.limit !== undefined) {
      params = params.set('limit', query.limit);
    }

    return this.http.get<SnippetListResponse>(this.apiUrl, { params });
  }

  create(draft: SnippetDraft): Observable<Snippet> {
    return this.http.post<Snippet>(this.apiUrl, draft);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

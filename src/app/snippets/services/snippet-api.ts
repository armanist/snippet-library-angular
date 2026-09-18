import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Snippet, SnippetDraft } from '../snippet.model';

@Injectable({
  providedIn: 'root',
})
export class SnippetApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/snippets';

  getAll(): Observable<Snippet[]> {
    return this.http.get<Snippet[]>(this.apiUrl);
  }

  create(draft: SnippetDraft): Observable<Snippet> {
    return this.http.post<Snippet>(this.apiUrl, draft);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

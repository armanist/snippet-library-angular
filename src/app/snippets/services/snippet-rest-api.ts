import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { API_BASE_URL } from '../../api-config';
import type { SnippetDataSource } from '../contracts/snippet-data-source';
import type { Snippet } from '../contracts/snippet';
import type { SnippetDraft } from '../contracts/create-snippet';
import type { SnippetUpdate } from '../contracts/update-snippet';
import type { SnippetListQuery, SnippetListResponse } from '../contracts/find-snippet';

@Injectable({
  providedIn: 'root'
})
export class SnippetRestApi implements SnippetDataSource {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_BASE_URL}/snippets`;

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

    return this.http.get<SnippetListResponse>(this.apiUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => 
        throwError(() => this.toError(error, 'Failed to load snippets'))
      )
    );
  }

  create(draft: SnippetDraft): Observable<Snippet> {
    return this.http.post<Snippet>(this.apiUrl, draft).pipe(
      catchError((error: HttpErrorResponse) => 
        throwError(() => this.toError(error, 'Failed to create snippet'))
      )
    );
  }

  update(id: string, changes: SnippetUpdate): Observable<Snippet> {
    return this.http.patch<Snippet>(`${this.apiUrl}/${id}`, changes).pipe(
      catchError((error: HttpErrorResponse) => 
        throwError(() => this.toError(error, 'Failed to update snippet'))
      )
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => 
        throwError(() => this.toError(error, 'Failed to delete snippet'))
      )
    );
  }

  private toError(response: HttpErrorResponse, fallbackMessage: string): Error {
    const body: unknown = response.error;

    const message =
      typeof body === 'object' && body !== null && 'message' in body
        ? [body.message].flat().join('; ')
        : `${fallbackMessage} (${response.status})`;

    return new Error(message);
  }
}

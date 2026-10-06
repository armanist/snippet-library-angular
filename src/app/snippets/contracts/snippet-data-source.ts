import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import type {
    Snippet,
    SnippetDraft,
    SnippetListQuery,
    SnippetListResponse,
    SnippetUpdate,
} from "../snippet.model";

export interface SnippetDataStore {
    getAll(query: SnippetListQuery): Observable<SnippetListResponse>;
    create(draft: SnippetDraft): Observable<Snippet>;
    update(id: string, changes: SnippetUpdate): Observable<Snippet>;
    delete(id: string): Observable<void>;
}

export const SNIPPET_DATA_SOURCE = new InjectionToken<SnippetDataStore>('SnippetDataSource');
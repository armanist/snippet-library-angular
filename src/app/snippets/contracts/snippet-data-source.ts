import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import type { Snippet } from "./snippet";
import type { SnippetDraft } from "./create-snippet";
import type { SnippetUpdate } from "./update-snippet";
import type { SnippetListQuery, SnippetListResponse } from "./find-snippet";

export interface SnippetDataStore {
    getAll(query: SnippetListQuery): Observable<SnippetListResponse>;
    create(draft: SnippetDraft): Observable<Snippet>;
    update(id: string, changes: SnippetUpdate): Observable<Snippet>;
    delete(id: string): Observable<void>;
}

export const SNIPPET_DATA_SOURCE = new InjectionToken<SnippetDataStore>('SnippetDataSource');
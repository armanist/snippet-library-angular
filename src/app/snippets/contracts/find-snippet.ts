import type { Snippet } from "./snippet";


export interface SnippetListQuery {
    search?: string;
    page?: number;
    limit?: number;
}

export interface SnippetPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface SnippetListResponse {
    snippets: Snippet[];
    pagination: SnippetPagination
}
export const languages = [
    'php',
    'javascript',
    'typescript',
    'html',
    'css',
] as const;

export type Language = (typeof languages)[number];

export interface Snippet {
    id: string;
    title: string;
    language: Language;
    code: string;
    tags: string[];
    createdAt: string;
}

export type SnippetDraft = Omit<Snippet, 'id' | 'createdAt'>

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
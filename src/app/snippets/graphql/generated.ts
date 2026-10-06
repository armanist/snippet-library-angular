/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type CreateSnippetInput = {
  code: string;
  language: SnippetLanguage;
  tags: Array<string>;
  title: string;
};

export type SnippetLanguage =
  | 'css'
  | 'html'
  | 'javascript'
  | 'php'
  | 'typescript';

export type UpdateSnippetInput = {
  code?: string | null | undefined;
  language?: SnippetLanguage | null | undefined;
  tags?: Array<string> | null | undefined;
  title?: string | null | undefined;
};

export type CreateSnippetMutationVariables = Exact<{
  input: CreateSnippetInput;
}>;


export type CreateSnippetMutation = { createSnippet: { id: string, title: string, language: SnippetLanguage, code: string, tags: Array<string>, createdAt: string } };

export type UpdateSnippetMutationVariables = Exact<{
  id: string | number;
  input: UpdateSnippetInput;
}>;


export type UpdateSnippetMutation = { updateSnippet: { id: string, title: string, language: SnippetLanguage, code: string, tags: Array<string>, createdAt: string } };

export type DeleteSnippetMutationVariables = Exact<{
  id: string | number;
}>;


export type DeleteSnippetMutation = { deleteSnippet: string };

export type GetSnippetsQueryVariables = Exact<{
  search?: string | null | undefined;
  page?: number | null | undefined;
  limit?: number | null | undefined;
}>;


export type GetSnippetsQuery = { snippets: { snippets: Array<{ id: string, title: string, language: SnippetLanguage, code: string, tags: Array<string>, createdAt: string }>, pagination: { page: number, limit: number, total: number, totalPages: number } } };

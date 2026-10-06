import type { Snippet } from './snippet';

export type SnippetDraft = Omit<Snippet, 'id' | 'createdAt'>;
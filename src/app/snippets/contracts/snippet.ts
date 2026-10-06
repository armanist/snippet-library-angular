import type { Language } from "./snippet-language";

export interface Snippet {
    id: string;
    title: string;
    language: Language;
    code: string;
    tags: string[];
    createdAt: string;
}

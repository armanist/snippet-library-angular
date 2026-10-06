export const languages = [
    'php',
    'javascript',
    'typescript',
    'html',
    'css',
] as const;

export type Language = (typeof languages)[number];
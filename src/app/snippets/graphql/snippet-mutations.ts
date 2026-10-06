import { gql } from "apollo-angular";

export const CREATE_SNIPPET_MUTATION = gql`
    mutation CreateSnippet($input: CreateSnippetInput!) {
        createSnippet(input: $input) {
            id
            title
            language
            code
            tags
            createdAt
        }
    }
`;

export const UPDATE_SNIPPET_MUTATION = gql`
    mutation UpdateSnippet($id: ID!, $input: UpdateSnippetInput!) {
        updateSnippet(id: $id, input: $input) {
            id,
            title,
            language
            code
            tags
            createdAt
        }
    }
`;

export const DELETE_SNIPPET_MUTATION = gql`
    mutation DeleteSnippet($id: ID!) {
        deleteSnippet(id: $id)
    }
`;
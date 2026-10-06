import { gql } from "apollo-angular";

export const GET_SNIPPETS_QUERY = gql`
    query GetSnippets($search: String, $page: Int, $limit: Int) {
        snippets(search: $search, page: $page, limit: $limit) {
            snippets {
                id
                title
                language
                code
                tags
                createdAt
            }
            pagination {
                page
                limit
                total
                totalPages
            }
        }
    }
`;
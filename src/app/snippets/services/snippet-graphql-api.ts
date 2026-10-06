import { inject, Injectable, input } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map, type Observable } from "rxjs";
import { GET_SNIPPETS_QUERY } from "../graphql/snippet-queries";
import { CREATE_SNIPPET_MUTATION } from "../graphql/snippet-mutations";
import { UPDATE_SNIPPET_MUTATION } from "../graphql/snippet-mutations";
import { DELETE_SNIPPET_MUTATION } from "../graphql/snippet-mutations";
import type { SnippetDataStore } from "../contracts/snippet-data-source";
import type {
    Snippet,
    SnippetDraft,
    SnippetListQuery,
    SnippetListResponse,
    SnippetUpdate
} from "../snippet.model";

@Injectable({
    providedIn: 'root'
})
export class SnippetGraphqlApi implements SnippetDataStore {
    private readonly apollo = inject(Apollo);

    getAll(query: SnippetListQuery): Observable<SnippetListResponse> {
        return this.apollo
            .query<{ snippets: SnippetListResponse }, SnippetListQuery>({
                query: GET_SNIPPETS_QUERY,
                variables: query,
                fetchPolicy: 'network-only',
            })
            .pipe(
                map(({ data }) => {
                    if (!data) {
                        throw new Error('GraphQL query returned no data');
                    }

                    return data.snippets;
                })
            );
    }

    create(draft: SnippetDraft): Observable<Snippet> {
        return this.apollo
            .mutate<{ createSnippet: Snippet }, { input: SnippetDraft }>({
                mutation: CREATE_SNIPPET_MUTATION,
                variables: { input: draft },
            })
            .pipe(
                map(({ data }) => {
                    if (!data) {
                        throw new Error('GraphQL mutation returned no data');
                    }

                    return data.createSnippet;
                }),
            );
    }

    update(id: string, changes: SnippetUpdate): Observable<Snippet> {
        return this.apollo
            .mutate<
                { updateSnippet: Snippet },
                { id: string, input: SnippetUpdate }
            >({
                mutation: UPDATE_SNIPPET_MUTATION,
                variables: { id, input: changes },
            })
            .pipe(
                map(({ data }) => {
                    if (!data) {
                        throw new Error('GraphQL mutation returned no data');
                    }

                    return data.updateSnippet;
                })
            );
    }

    delete(id: string): Observable<void> {
        return this.apollo
            .mutate<{ deleteSnippet: string }, { id: string }>({
                mutation: DELETE_SNIPPET_MUTATION,
                variables: { id }
            })
            .pipe(
                map(({ data }) => {
                    if (!data) {
                        throw new Error('GraphQL mutation returned no data');
                    }
                })
            );
    }
}
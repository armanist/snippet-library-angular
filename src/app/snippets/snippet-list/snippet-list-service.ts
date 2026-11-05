import { Injectable, inject, signal } from "@angular/core";
import {
    EMPTY,
    Subject,
    catchError,
    debounceTime,
    distinctUntilChanged,
    merge,
    startWith,
    switchMap,
} from 'rxjs';
import { SnippetChanges } from '../services/snippet-changes';
import { ToastService } from "../../shared/toast/toast-service";
import { SNIPPET_DATA_SOURCE } from "../contracts/snippet-data-source";
import type { Snippet } from "../contracts/snippet";
import type { SnippetPagination, SnippetListQuery } from "../contracts/find-snippet";

@Injectable({
    providedIn: 'root'
})
export class SnippetListService {
    private readonly snippetsState = signal<Snippet[]>([]);
    private readonly paginationState = signal<SnippetPagination | null>(null);
    private readonly isLoadingState = signal(true);
    private readonly searchTermState = signal('');

    readonly snippets = this.snippetsState.asReadonly();
    readonly pagination = this.paginationState.asReadonly();
    readonly isLoading = this.isLoadingState.asReadonly();
    readonly searchTerm = this.searchTermState.asReadonly();

    private readonly dataSource = inject(SNIPPET_DATA_SOURCE);
    private readonly toast = inject(ToastService);
    private readonly changes = inject(SnippetChanges);

    private readonly pageSize = 2;
    private readonly listQueries = new Subject<SnippetListQuery>();
    private readonly refreshQueries = new Subject<SnippetListQuery>();

    constructor() {
        const debouncedQueries = this.listQueries.pipe(
            debounceTime(300),
            startWith({ search: '', page: 1, limit: this.pageSize }),
            distinctUntilChanged((previous, current) =>
                previous.search === current.search &&
                previous.page === current.page &&
                previous.limit === current.limit,
            ),
        );

        merge(debouncedQueries, this.refreshQueries)
            .pipe(switchMap((query) => this.loadSnippets(query)))
            .subscribe((response) => {
                const {page, totalPages} = response.pagination;

                if(totalPages > 0 && page > totalPages) {
                    this.goToPage(totalPages);
                    return;
                }

                this.snippetsState.set(response.snippets);
                this.paginationState.set(response.pagination);
                this.isLoadingState.set(false);
            });

        this.changes.changed.subscribe(() => this.refreshCurrentPage());
    }

    search(term: string): void {
        this.searchTermState.set(term);

        this.listQueries.next({
            search: term.trim(),
            page: 1,
            limit: this.paginationState()?.limit ?? this.pageSize
        });
    }

    goToPage(page: number): void {
        const pagination = this.paginationState();

        if (!pagination || page < 1 || page > pagination.totalPages) {
            return;
        }

        this.listQueries.next({
            search: this.searchTermState().trim(),
            page,
            limit: pagination.limit
        });
    }

    private loadSnippets(query: SnippetListQuery) {
        this.isLoadingState.set(true);

        return this.dataSource.getAll(query).pipe(
            catchError((error: unknown) => {
                console.error('Angular failed to load snippets:', error);
                this.isLoadingState.set(false);

                const message = error instanceof Error 
                    ? error.message
                    : 'Could not load snippets.';

                this.toast.showError(message);

                return EMPTY;
            }),
        );
    }

    private refreshCurrentPage(): void {
        const pagination  = this.paginationState();

        this.refreshQueries.next({
            search: this.searchTermState().trim(),
            page: pagination?.page ?? 1,
            limit: pagination?.limit ?? this.pageSize,
        });
    }
}
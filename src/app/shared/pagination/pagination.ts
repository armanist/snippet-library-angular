import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { SnippetPagination } from "../../snippets/snippet.model";

@Component ({
    selector: 'app-pagination',
    imports: [],
    templateUrl: './pagination.html',
})
export class Pagination {
    @Input() pagination!: SnippetPagination;
    @Input() disabled = false;

    @Output() pageChange = new EventEmitter<number>();

    requestPage(page: number): void {
        this.pageChange.emit(page);
    }
}
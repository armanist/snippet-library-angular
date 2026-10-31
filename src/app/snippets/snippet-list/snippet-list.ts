import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pagination } from '../../shared/pagination/pagination';
import { SnippetListService } from './snippet-list-service';
import { SnippetCard } from '../snippet-card/snippet-card';
import type { Snippet } from '../contracts/snippet';

@Component({
  selector: 'app-snippet-list',
  imports: [FormsModule, SnippetCard, Pagination],
  templateUrl: './snippet-list.html',
})
export class SnippetList {
  @Output() editRequested = new EventEmitter<Snippet>();
  @Output() deleteRequested = new EventEmitter<Snippet>();

  constructor(protected readonly list: SnippetListService) {}

  handleEdit(snippet: Snippet): void {
    this.editRequested.emit(snippet);
  }

  handleDelete(snippet: Snippet): void {
    this.deleteRequested.emit(snippet)
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SnippetCard } from '../snippet-card/snippet-card';
import type { Snippet } from '../contracts/snippet';

@Component({
  selector: 'app-snippet-list',
  imports: [SnippetCard],
  templateUrl: './snippet-list.html',
})
export class SnippetList {
  @Input({required: true}) snippets!: Snippet[];
  @Output() editRequested = new EventEmitter<string>();
  @Output() deleteRequested = new EventEmitter<string>();

  handleEdit(id: string): void {
    this.editRequested.emit(id);
  }

  handleDelete(id: string): void {
    this.deleteRequested.emit(id)
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Snippet } from '../snippet.model';

@Component({
  selector: 'app-snippet-card',
  imports: [],
  templateUrl: './snippet-card.html',
})
export class SnippetCard {
  @Input({ required: true }) snippet!: Snippet;
  @Output() editRequested = new EventEmitter<string>();
  @Output() deleteRequested = new EventEmitter<string>();

  handleEdit(): void {
    this.editRequested.emit(this.snippet.id);
  }

  handleDelete(): void {
    this.deleteRequested.emit(this.snippet.id);
  }
}

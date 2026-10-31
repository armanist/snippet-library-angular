import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Snippet } from '../contracts/snippet';

@Component({
  selector: 'app-snippet-card',
  imports: [],
  templateUrl: './snippet-card.html',
})
export class SnippetCard {
  @Input({ required: true }) snippet!: Snippet;
  @Output() editRequested = new EventEmitter<Snippet>();
  @Output() deleteRequested = new EventEmitter<Snippet>();

  handleEdit(): void {
    this.editRequested.emit(this.snippet);
  }

  handleDelete(): void {
    this.deleteRequested.emit(this.snippet);
  }
}

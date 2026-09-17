import { Component, Input } from '@angular/core';
import type { Snippet } from '../snippet.model';

@Component({
  selector: 'app-snippet-card',
  imports: [],
  templateUrl: './snippet-card.html',
  styleUrl: './snippet-card.css',
})
export class SnippetCard {
  @Input({required: true}) snippet!: Snippet;
}

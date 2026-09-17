import { Component, Input } from '@angular/core';
import { SnippetCard } from '../snippet-card/snippet-card';
import type { Snippet } from '../snippet.model';

@Component({
  selector: 'app-snippet-list',
  imports: [SnippetCard],
  templateUrl: './snippet-list.html',
  styleUrl: './snippet-list.css',
})
export class SnippetList {
  @Input({required: true}) snippets!: Snippet[];
}

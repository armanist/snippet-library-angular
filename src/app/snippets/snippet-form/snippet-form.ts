import { 
  Component, 
  EventEmitter, 
  Input, 
  Output, 
  OnChanges, 
  SimpleChanges,
  ViewChild,
  ElementRef,
  viewChild, 
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { languages, type Language } from '../contracts/snippet-language';
import type { Snippet } from '../contracts/snippet';
import type { SnippetDraft } from '../contracts/create-snippet';

@Component({
  selector: 'app-snippet-form',
  imports: [FormsModule],
  templateUrl: './snippet-form.html',
})
export class SnippetForm implements OnChanges {
  @Input({ required: true }) editingSnippet!: Snippet | null;
  @Output() submitted = new EventEmitter<SnippetDraft>();
  @Output() validationError = new EventEmitter<string>();
  @Output() canceled = new EventEmitter<void>();
  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;
  @ViewChild('snippetForm') ngForm?: NgForm;

  readonly languages = languages;

  title = '';
  selectedLanguage: Language = languages[0];
  code = '';
  tags = '';

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['editingSnippet']) {
      return;
    }
    
    const snippet = this.editingSnippet;

    if(snippet) {
      this.titleInput.nativeElement.focus();
    }

    this.title = snippet?.title ?? '';
    this.selectedLanguage = snippet?.language ?? languages[0];
    this.code = snippet?.code ?? '';
    this.tags = snippet?.tags.join(', ') ?? '';

    this.ngForm?.resetForm({
      title: this.title,
      language: this.selectedLanguage,
      code: this.code,
      tags: this.tags,
    });
  }

  handleSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.validationError.emit('Title and code are required.');
      return;
    }

    const formValue = form.value;

    const draft: SnippetDraft = {
      title: String(formValue.title ?? '').trim(),
      language: this.selectedLanguage,
      code: String(formValue.code ?? '').trim(),
      tags: String(formValue.tags ?? '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    this.submitted.emit(draft);

    if (!this.editingSnippet) {
      this.title = '';
      this.selectedLanguage = languages[0];
      this.code = '';
      this.tags = '';

      form.resetForm({
        title: '',
        language: languages[0],
        code: '',
        tags: '',
      });
    }
  }

  handleCancel(): void {
    this.canceled.emit();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { languages } from '../snippet.model';
import type { Language, SnippetDraft } from '../snippet.model';

@Component({
  selector: 'app-snippet-form',
  imports: [FormsModule],
  templateUrl: './snippet-form.html',
  styleUrl: './snippet-form.css',
})
export class SnippetForm {
  @Output() submitted = new EventEmitter<SnippetDraft>();
  @Output() validationError = new EventEmitter<string>();

  readonly languages = languages;

  selectedLanguage: Language = languages[0];

  handleSubmit(form: NgForm): void {
    if(form.invalid) {
      form.control.markAllAsTouched();
      this.validationError.emit('Title and code are required.');
      return;
    }

    const formValue = form.value;

    const draft: SnippetDraft = {
      title: String(formValue.title ?? '').trim(),
      language: this.selectedLanguage,
      code: String(formValue.code ?? '').trim(),
      tags: String(formValue.tags ?? '').split(',').map((tag) => tag.trim()).filter(Boolean),
    };

    this.submitted.emit(draft);
    form.resetForm({
      title: '',
      language: languages[0],
      code: '',
      tags: ''
    });
  }
}

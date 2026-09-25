import { Component, Input } from '@angular/core';

export type ToastType = 'success' | 'error';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
})
export class Toast {
  @Input() message = '';
  @Input() type: ToastType = 'success';
}

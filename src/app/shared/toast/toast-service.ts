import { Injectable, signal } from "@angular/core";
import type { ToastType } from "./toast";

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private readonly messageState = signal('');
    private readonly typeState = signal<ToastType>('success');

    readonly message = this.messageState.asReadonly();
    readonly type = this.typeState.asReadonly();

    showSuccess(text: string): void {
        this.messageState.set(text);
        this.typeState.set('success');
    }

    showError(text: string): void {
        this.messageState.set(text);
        this.typeState.set('error');
    }
}
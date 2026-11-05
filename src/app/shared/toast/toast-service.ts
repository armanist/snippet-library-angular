import { Injectable, signal } from "@angular/core";
import type { ToastType } from "./toast";

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private readonly messageState = signal('');
    private readonly typeState = signal<ToastType>('success');
    
    private timeoutId: ReturnType<typeof setTimeout> | undefined; 

    readonly message = this.messageState.asReadonly();
    readonly type = this.typeState.asReadonly();

    showSuccess(message: string): void {
        this.show(message, 'success');
    }

    showError(message: string): void {
        this.show(message, 'error');
    }

    private show(message: string, type: ToastType): void {
        clearTimeout(this.timeoutId);

        this.messageState.set(message);
        this.typeState.set(type);

        this.timeoutId = setTimeout(() => {
            this.messageState.set('');
        }, 3000);
    }
}
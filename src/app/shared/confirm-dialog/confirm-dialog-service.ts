import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {
    private readonly visibleState = signal(false);
    private readonly pendingIdState = signal<string | null>(null);
    private readonly pendingTitleState = signal('');

    readonly visible = this.visibleState.asReadonly();
    readonly pendingId = this.pendingIdState.asReadonly();
    readonly pendingTitle = this.pendingTitleState.asReadonly();

    open(id: string, title: string): void {
        this.pendingIdState.set(id);
        this.pendingTitleState.set(title);
        this.visibleState.set(true);
    }

    close(): void {
        this.pendingIdState.set(null);
        this.pendingTitleState.set('');
        this.visibleState.set(false);
    }
}
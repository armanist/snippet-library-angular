import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SnippetChanges {
    readonly changed = new Subject<void>();
    readonly deleted = new Subject<string>();

    notify(): void {
        this.changed.next();
    }

    notifyDeleted(id: string): void {
        this.deleted.next(id);
    }
}
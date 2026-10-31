import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SnippetChanges {
    readonly changed = new Subject<void>();

    notify(): void {
        this.changed.next();
    }
}
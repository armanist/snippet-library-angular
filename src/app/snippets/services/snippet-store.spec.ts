import { TestBed } from '@angular/core/testing';

import { SnippetStore } from './snippet-store';

describe('SnippetStore', () => {
  let service: SnippetStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnippetStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

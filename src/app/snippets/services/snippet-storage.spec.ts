import { TestBed } from '@angular/core/testing';

import { SnippetStorage } from './snippet-storage';

describe('SnippetStorage', () => {
  let service: SnippetStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnippetStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

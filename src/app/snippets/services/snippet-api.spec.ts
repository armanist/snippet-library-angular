import { TestBed } from '@angular/core/testing';

import { SnippetApi } from './snippet-api';

describe('SnippetApi', () => {
  let service: SnippetApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnippetApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

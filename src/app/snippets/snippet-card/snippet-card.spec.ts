import { ComponentFixture, TestBed } from '@angular/core/testing';

import { exampleSnippets } from '../example-snippets';
import { SnippetCard } from './snippet-card';

describe('SnippetCard', () => {
  let component: SnippetCard;
  let fixture: ComponentFixture<SnippetCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnippetCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SnippetCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('snippet', exampleSnippets[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
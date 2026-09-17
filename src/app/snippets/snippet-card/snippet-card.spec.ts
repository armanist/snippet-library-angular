import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

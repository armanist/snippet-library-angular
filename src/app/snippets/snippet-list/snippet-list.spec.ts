import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetList } from './snippet-list';

describe('SnippetList', () => {
  let component: SnippetList;
  let fixture: ComponentFixture<SnippetList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnippetList],
    }).compileComponents();

    fixture = TestBed.createComponent(SnippetList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

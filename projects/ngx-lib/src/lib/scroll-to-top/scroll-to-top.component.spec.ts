import { TestBed, async, inject } from '@angular/core/testing';

import { ScrollToTopComponent } from './scroll-to-top.component';

describe('ScrollToTopComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ScrollToTopComponent
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ ScrollToTopComponent ], (app: ScrollToTopComponent) => {
    expect(app).toBeTruthy();
  }));
});

import { TestBed, async, inject } from '@angular/core/testing';

import { ScrollToDirective } from './scroll-to.directive';

describe('ScrollToDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ScrollToDirective
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ ScrollToDirective ], (app: ScrollToDirective) => {
    expect(app).toBeTruthy();
  }));
});

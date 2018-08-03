import { TestBed, async, inject } from '@angular/core/testing';

import { LazyShowDirective } from './lazy-show.directive';

describe('LazyShowDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
          LazyShowDirective
      ]
    }).compileComponents();
  }));

  it('should exist', inject([LazyShowDirective], (app: LazyShowDirective) => {
    expect(app).toBeTruthy();
  }));
});

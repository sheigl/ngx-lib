import { TestBed, async, inject } from '@angular/core/testing';

import { LazyNgForComponent } from './lazy-ng-for.component';

describe('LazyNgForComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LazyNgForComponent
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ LazyNgForComponent ], (app: LazyNgForComponent) => {
    expect(app).toBeTruthy();
  }));
});

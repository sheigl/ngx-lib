import { TestBed, async, inject } from '@angular/core/testing';

import { PagerComponent } from './pager.component';

describe('PagerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        PagerComponent
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ PagerComponent ], (app: PagerComponent) => {
    expect(app).toBeTruthy();
  }));
});

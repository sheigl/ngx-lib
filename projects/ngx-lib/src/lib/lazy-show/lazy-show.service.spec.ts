import { TestBed, async, inject } from '@angular/core/testing';

import { LazyShowService } from './lazy-show.service';

describe('LazyShowService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LazyShowService
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ LazyShowService ], (app: LazyShowService) => {
    expect(app).toBeTruthy();
  }));
});

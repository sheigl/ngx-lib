import { TestBed, async, inject } from '@angular/core/testing';

import { LazyNgForService } from './lazy-ng-for.service';

describe('LazyNgForService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LazyNgForService
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ LazyNgForService ], (app: LazyNgForService) => {
    expect(app).toBeTruthy();
  }));
});

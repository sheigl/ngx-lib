import { TestBed, async, inject } from '@angular/core/testing';

import { LazyNgForModule } from './lazy-ng-for.module';

describe('LazyNgForModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LazyNgForModule
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ LazyNgForModule ], (app: LazyNgForModule) => {
    expect(app).toBeTruthy();
  }));
});

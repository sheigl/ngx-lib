import { TestBed, async, inject } from '@angular/core/testing';

import { LazyShowModule } from './lazy-show.module';

describe('LazyShowModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LazyShowModule
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ LazyShowModule ], (app: LazyShowModule) => {
    expect(app).toBeTruthy();
  }));
});

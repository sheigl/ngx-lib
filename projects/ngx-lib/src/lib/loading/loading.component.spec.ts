import { TestBed, async, inject } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadingComponent
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ LoadingComponent ], (app: LoadingComponent) => {
    expect(app).toBeTruthy();
  }));
});

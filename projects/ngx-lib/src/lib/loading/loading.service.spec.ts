import { TestBed, async, inject } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadingService
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ LoadingService ], (app: LoadingService) => {
    expect(app).toBeTruthy();
  }));
});

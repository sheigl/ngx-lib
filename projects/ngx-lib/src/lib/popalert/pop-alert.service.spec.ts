import { TestBed, async, inject } from '@angular/core/testing';

import { PopAlertService } from './pop-alert.service';

describe('PopAlertService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        PopAlertService
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ PopAlertService ], (app: PopAlertService) => {
    expect(app).toBeTruthy();
  }));
});

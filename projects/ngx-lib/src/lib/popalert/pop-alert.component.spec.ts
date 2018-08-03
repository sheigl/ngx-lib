import { TestBed, async, inject } from '@angular/core/testing';

import { PopAlertComponent } from './pop-alert.component';

describe('PopAlertComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        PopAlertComponent
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ PopAlertComponent ], (app: PopAlertComponent) => {
    expect(app).toBeTruthy();
  }));
});

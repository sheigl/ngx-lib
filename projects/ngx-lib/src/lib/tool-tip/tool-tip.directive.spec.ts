import { TestBed, async, inject } from '@angular/core/testing';

import { ToolTipDirective } from './tool-tip.directive';

describe('ToolTipDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
          ToolTipDirective
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ToolTipDirective], (app: ToolTipDirective) => {
    expect(app).toBeTruthy();
  }));
});

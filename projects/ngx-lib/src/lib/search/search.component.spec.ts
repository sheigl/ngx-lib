import { TestBed, async, inject } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchComponent
      ]
    }).compileComponents();
  }));

  it('should exist', inject([ SearchComponent ], (app: SearchComponent) => {
    expect(app).toBeTruthy();
  }));
});

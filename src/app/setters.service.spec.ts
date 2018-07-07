import { TestBed, inject } from '@angular/core/testing';

import { SettersService } from './setters.service';

describe('SettersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettersService]
    });
  });

  it('should be created', inject([SettersService], (service: SettersService) => {
    expect(service).toBeTruthy();
  }));
});

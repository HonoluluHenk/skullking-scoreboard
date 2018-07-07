import { TestBed, inject } from '@angular/core/testing';

import { GettersService } from './getters.service';

describe('GettersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GettersService]
    });
  });

  it('should be created', inject([GettersService], (service: GettersService) => {
    expect(service).toBeTruthy();
  }));
});

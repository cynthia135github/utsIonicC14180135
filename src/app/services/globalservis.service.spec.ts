import { TestBed } from '@angular/core/testing';

import { GlobalservisService } from './globalservis.service';

describe('GlobalservisService', () => {
  let service: GlobalservisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalservisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { KeyClockService } from './key-clock.service';

describe('KeyClockService', () => {
  let service: KeyClockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyClockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TractoraService } from './tractora.service';

describe('TractoraService', () => {
  let service: TractoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TractoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { OperacionPostService } from './operacion-post.service';

describe('OperacionPostService', () => {
  let service: OperacionPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacionPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

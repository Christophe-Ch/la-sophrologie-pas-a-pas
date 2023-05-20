import { TestBed } from '@angular/core/testing';

import { AxeptioService } from './axeptio.service';

describe('AxeptioService', () => {
  let service: AxeptioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxeptioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

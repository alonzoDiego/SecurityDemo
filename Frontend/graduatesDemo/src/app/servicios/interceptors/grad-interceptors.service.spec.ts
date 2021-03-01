import { TestBed } from '@angular/core/testing';

import { GradInterceptorsService } from './grad-interceptors.service';

describe('GradInterceptorsService', () => {
  let service: GradInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

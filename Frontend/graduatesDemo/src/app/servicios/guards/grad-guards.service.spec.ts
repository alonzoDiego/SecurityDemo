import { TestBed } from '@angular/core/testing';

import { GradGuardsService } from './grad-guards.service';

describe('GradGuardsService', () => {
  let service: GradGuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

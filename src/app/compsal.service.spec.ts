import { TestBed } from '@angular/core/testing';

import { CompsalService } from './compsal.service';

describe('CompsalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompsalService = TestBed.get(CompsalService);
    expect(service).toBeTruthy();
  });
});

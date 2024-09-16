import { TestBed } from '@angular/core/testing';

import { LocalstorageBasicService } from './localstorage-basic.service';

describe('LocalstorageBasicService', () => {
  let service: LocalstorageBasicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageBasicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EventStorageService } from './event-storage.service';

describe('EventStorageService', () => {
  let service: EventStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

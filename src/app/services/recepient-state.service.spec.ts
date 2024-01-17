import { TestBed } from '@angular/core/testing';

import { RecepientStateService } from './recepient-state.service';

describe('RecepientStateService', () => {
  let service: RecepientStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecepientStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

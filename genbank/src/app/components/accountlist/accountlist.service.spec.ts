import { TestBed } from '@angular/core/testing';

import { AccountlistService } from './accountlist.service';

describe('AccountlistService', () => {
  let service: AccountlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

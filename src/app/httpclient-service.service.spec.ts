import { TestBed } from '@angular/core/testing';

import { HTTPclientServiceService } from './httpclient-service.service';

describe('HTTPclientServiceService', () => {
  let service: HTTPclientServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HTTPclientServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

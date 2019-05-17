import { TestBed } from '@angular/core/testing';

import { HttpInterceptorJwtService } from './http-interceptor-jwt.service';

describe('HttpInterceptorJwtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpInterceptorJwtService = TestBed.get(HttpInterceptorJwtService);
    expect(service).toBeTruthy();
  });
});

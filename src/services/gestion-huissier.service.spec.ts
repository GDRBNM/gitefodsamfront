import { TestBed } from '@angular/core/testing';

import { GestionHuissierService } from './gestion-huissier.service';

describe('GestionHuissierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionHuissierService = TestBed.get(GestionHuissierService);
    expect(service).toBeTruthy();
  });
});

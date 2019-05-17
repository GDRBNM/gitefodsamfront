import { TestBed } from '@angular/core/testing';

import { AgentGuardService } from './agent-guard.service';

describe('AgentGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentGuardService = TestBed.get(AgentGuardService);
    expect(service).toBeTruthy();
  });
});

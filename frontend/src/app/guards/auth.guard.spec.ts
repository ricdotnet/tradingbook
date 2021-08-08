import { TestBed } from '@angular/core/testing';

import { NoAuthGuard } from './noAuth.guard';
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthGuard', () => {
  let guard: NoAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule]
    });
    guard = TestBed.inject(NoAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

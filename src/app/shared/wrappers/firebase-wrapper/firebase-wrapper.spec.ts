import { TestBed } from '@angular/core/testing';
import { FirebaseWrapper } from './firebase-wrapper';

describe('FirebaseService', () => {
  let service: FirebaseWrapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseWrapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

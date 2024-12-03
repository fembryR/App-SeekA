import { TestBed } from '@angular/core/testing';
import { FirestoreService } from './firestore.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

// Mock para Firestore
const mockFirestore = {
  collection: jasmine.createSpy('collection').and.returnValue({
    add: jasmine.createSpy('add'),
    where: jasmine.createSpy('where'),
  }),
};

describe('FirestoreService', () => {
  let service: FirestoreService;
  let firestoreMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirestoreService,
        { provide: Firestore, useValue: mockFirestore },
      ],
    });
    service = TestBed.inject(FirestoreService);
    firestoreMock = TestBed.inject(Firestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should check if a user exists', async () => {
    const mockQuerySnapshot = {
      empty: false,
    };
    spyOn(service, 'checkUserExists').and.returnValue(Promise.resolve(!mockQuerySnapshot.empty));
    const exists = await service.checkUserExists('testUser');
    expect(service.checkUserExists).toHaveBeenCalledWith('testUser');
    expect(exists).toBe(true);
  });

  it('should get a user by credentials', async () => {
    const mockUserData = { nombre: 'testUser', password: '1234' };
    spyOn(service, 'getUserByCredentials').and.returnValue(Promise.resolve(mockUserData));
    const user = await service.getUserByCredentials('testUser', '1234');
    expect(service.getUserByCredentials).toHaveBeenCalledWith('testUser', '1234');
    expect(user).toEqual(mockUserData);
  });
});

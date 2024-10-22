import { TestBed } from '@angular/core/testing';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/services/auth.service'; // Asegúrate de que esta ruta sea correcta

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    expect(guard.canActivate()).toBe(true);
  });

  it('should navigate to login if user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    guard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

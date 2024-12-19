import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NavigationService } from '../services/navigation.service';
import { authGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('authGuard', () => {
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;
  let navigationService: jasmine.SpyObj<NavigationService>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['saveCurrentRoute']);

    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NavigationService, useValue: navigationServiceSpy }
      ]
    });

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
  });

  function executeGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return TestBed.runInInjectionContext(() => authGuard(route, state));
  }

  it('should return true and save the current route when user is authenticated', () => {
    userService.isAuthenticated.and.returnValue(true);
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/some-path' } as RouterStateSnapshot;

    const result = executeGuard(route, state);

    expect(result).toBeTrue();
    expect(navigationService.saveCurrentRoute).toHaveBeenCalledWith('/some-path');
  });

  it('should navigate to /login and return false when user is not authenticated', () => {
    userService.isAuthenticated.and.returnValue(false);
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/some-path' } as RouterStateSnapshot;

    const result = executeGuard(route, state);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

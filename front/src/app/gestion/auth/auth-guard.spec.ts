import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthGuard } from './auth-guard';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
      ],
    });
    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    route = new ActivatedRouteSnapshot();
    state = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', [
      'toString',
    ]);
  });

  it('devrait se créer', () => {
    expect(authGuard).toBeTruthy();
  });

  //? à changer quand jeton
  it(`devrait donner l'accès quand le template n'est pas lots`, () => {
    route.data = { template: 'anything' };
    expect(authGuard.canActivate(route, state)).toBe(true);
  });

  it(`ne devrait pas donner l'accès si le template est lots`, () => {
    route.data = { template: 'lots' };
    expect(authGuard.canActivate(route, state)).toBe(false);
  });

  it('should navigate to error page with status 401 when access is not allowed', () => {
    route.data = { template: 'lots' };
    expect(authGuard.canActivate(route, state)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/gag/error'], {
      queryParams: { status: 401 },
    });
  });
});

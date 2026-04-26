import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CongresoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const token = localStorage.getItem('OB_access_token');
    const isLoginRoute = route.routeConfig?.path === 'login';

    if (isLoginRoute) {
      // Si hay token y quiere ir a login, redirige a dashboard
      if (token) {
        return this.router.createUrlTree(['/congreso/dashboard']);
      }
      return true;
    } else {
      // Si no hay token y quiere ir a rutas protegidas, redirige a login
      if (!token) {
        return this.router.createUrlTree(['/congreso/login']);
      }
      return true;
    }
  }
}

// Angular
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate
} from '@angular/router'
// RxJs
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
// Services
import { Auth0Service } from './auth0.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: Auth0Service) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
    return this.authService.isAuthenticated$.pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.authService.login(state.url)
        }
      })
    )
  }
}

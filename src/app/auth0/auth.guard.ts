// Angular
import { Injectable, OnDestroy } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
// RxJS
import { Subject } from 'rxjs'
// Services
import { Auth0Service } from './auth0.service'

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()
  private authenticated: boolean

  constructor(private authService: Auth0Service, private router: Router) {
    this.authService.authenticated$.subscribe(
      authenticated => (this.authenticated = authenticated)
    )
  }

  canActivate() {
    if (!this.authService.isAuth0Authenticated()) {
      this.router.navigate(['/login'])
      return false
    }

    return true
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

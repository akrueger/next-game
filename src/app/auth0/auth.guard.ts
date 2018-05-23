// Angular
import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
// Services
import { Auth0Service } from './auth0.service'
import { SpinnerService } from '../spinner/spinner.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private auth0: Auth0Service,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  canActivate() {
    if (this.auth0.authenticated) {
      this.spinnerService.setLoading(false)
      return true
    }
    this.router.navigate(['/'])
    return false
  }
}

// Angular
import { Component, OnInit, OnDestroy } from '@angular/core'
// Services
import { Auth0Service } from './auth0.service'
import { SpinnerService } from '../modules/shared/spinner/spinner.service'

@Component({
  selector: 'app-auth0-callback',
  template: ''
})
export class Auth0CallbackComponent implements OnInit, OnDestroy {
  constructor(
    private authService: Auth0Service,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.spinnerService.setLoading(true)
    this.authService.handleAuthCallback()
  }

  ngOnDestroy() {
    this.spinnerService.setLoading(false)
  }
}

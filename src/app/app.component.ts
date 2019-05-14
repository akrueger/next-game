// Angular
import { Component, OnInit, OnDestroy } from '@angular/core'
// RxJS
import { Observable, Subject, of } from 'rxjs'
// Services
import { Auth0Service } from './auth0/auth0.service'
import { SpinnerService } from './modules/shared/spinner/spinner.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()
  public isLoading$: Observable<Boolean>

  constructor(
    private authService: Auth0Service,
    private spinnerService: SpinnerService
  ) {
    this.spinnerService.isLoading$.subscribe(
      isLoading => (this.isLoading$ = of(isLoading))
    )
    authService.handleAuthentication()
    authService.scheduleRenewal()
  }

  ngOnInit() {
    if (this.authService.isAuth0Authenticated()) {
      this.authService.renewTokens()
    }
  }

  setLoading(value: boolean) {
    this.spinnerService.setLoading(value)
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

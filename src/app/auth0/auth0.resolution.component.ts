// Angular
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
// RxJx
import { Subscription, Observable, of } from 'rxjs'
// Services
import { Auth0Service } from './auth0.service'
import { RestService } from '../app.component.service'
import { SpinnerService } from '../spinner/spinner.service'

@Component({
  selector: 'app-auth0-resolution',
  template: `''`
})
export class Auth0ResolutionComponent implements OnInit, OnDestroy {
  loggedInSub: Subscription
  allGames$: Observable<any>

  constructor(
    private auth: Auth0Service,
    private spinnerService: SpinnerService,
    private restService: RestService,
    private router: Router
  ) {
    this.spinnerService.setLoading(true)
    // Parse authentication hash
    auth.handleLoginCallback()
  }

  ngOnInit() {
    this.loggedInSub = this.auth.loggedIn$.subscribe(
      loggedIn => (loggedIn ? this.router.navigate(['/dashboard']) : null)
    )
  }

  getGames() {
    this.restService.getGames().subscribe(games => (this.allGames$ = of(games)))
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe()
  }
}

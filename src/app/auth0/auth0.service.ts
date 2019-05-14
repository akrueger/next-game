// Angular
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
// RxJS
import { BehaviorSubject, of, timer } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
// Auth0
import * as Auth0 from 'auth0-js'
// Models
import { User } from './user.model'
// Services
import { MessageService } from 'primeng/api'
import { ProfileService } from '../profile/profile.component.service'
// Configuration
import { environment } from '../../environments/environment'

@Injectable()
export class Auth0Service {
  public authenticated$ = new BehaviorSubject<boolean>(false)
  private refreshSubscription
  public userProfile: User

  private auth0 = new Auth0.WebAuth({
    clientID: 'bYYDsiHz-do-L996f9CoV8weqU32lbNE',
    domain: 'app63125392.auth0.com',
    responseType: 'token id_token',
    audience: environment.production
      ? 'https://next-game-pls.herokuapp.com/api/'
      : 'http://localhost:3001/api/',
    redirectUri: environment.production
      ? 'https://next-game-pls.herokuapp.com'
      : 'http://localhost:4200',
    scope: 'openid profile'
  })

  constructor(
    private router: Router,
    private messageService: MessageService,
    private profileService: ProfileService
  ) {}

  login() {
    this.auth0.authorize()
  }

  logout() {
    sessionStorage.removeItem('expiresAt')
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('idToken')

    this.authenticated$.next(false)

    this.unscheduleRenewal()
  }

  public isAuth0Authenticated(): boolean {
    return (
      sessionStorage.getItem('accessToken') &&
      Date.now() < parseInt(sessionStorage.getItem('expiresAt'), 10)
    )
  }

  handleAuthentication() {
    this.auth0.parseHash((error, authResult) => {
      if (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'ERROR',
          detail: error.error,
          life: 5000
        })
        this.router.navigate(['/login'])
      } else if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        this.getUserProfile(authResult)
        this.router.navigate(['/dashboard'])
      }
    })
  }

  private setSession(authResult) {
    const expTime = authResult.expiresIn * 1000 + Date.now()

    sessionStorage.setItem('expiresAt', expTime.toString())
    sessionStorage.setItem('accessToken', authResult.accessToken)
    sessionStorage.setItem('idToken', authResult.idToken)

    this.authenticated$.next(true)

    this.scheduleRenewal()
  }

  public renewTokens() {
    this.auth0.checkSession({}, (error, authResult) => {
      if (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'ERROR',
          detail: error.error,
          life: 5000
        })
      } else {
        this.setSession(authResult)
      }
    })
  }

  public scheduleRenewal() {
    if (!this.isAuth0Authenticated()) {
      return
    }
    this.unscheduleRenewal()

    const expiresIn$ = of(
      parseInt(sessionStorage.getItem('expiresAt'), 10)
    ).pipe(
      mergeMap(expiresAt => {
        const now = Date.now()
        // Use timer to track delay until expiration
        // to run the refresh at the proper time
        return timer(Math.max(1, expiresAt - now))
      })
    )

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = expiresIn$.subscribe(() => {
      this.renewTokens()
      this.scheduleRenewal()
    })
  }

  public unscheduleRenewal() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe()
    }
  }

  private getUserProfile(authResult) {
    if (authResult && authResult.idTokenPayload) {
      this.profileService.setUserProfile(authResult.idTokenPayload)
    }
  }
}

// Angular
import { Injectable } from '@angular/core'
// RxJS
import { BehaviorSubject } from 'rxjs'
// Auth0
import * as Auth0 from 'auth0-js'
// Models
import { User } from './user.model'
// Hack
;(window as any).global = window // https://github.com/auth0/auth0.js/issues/753

@Injectable()
export class Auth0Service {
  private auth0 = new Auth0.WebAuth({
    clientID: 'tOFlFsZjXtwJD1q2XdvBfZx6rMPVtckH',
    domain: 'indigo-squid.auth0.com',
    responseType: 'token id_token',
    audience: 'http://localhost:3001/api/',
    redirectUri: 'http://localhost:4200/auth0-resolution',
    scope: 'openid'
  })
  user: User
  accessToken: string

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn)

  constructor() {
    // You can restore an unexpired authentication session on init
    // by using the checkSession() endpoint from auth0.js:
    // https://auth0.com/docs/libraries/auth0js/v9#using-checksession-to-acquire-new-tokens
  }

  private setLoggedIn(value: boolean) {
    this.loggedIn$.next(value)
    this.loggedIn = value
  }

  login() {
    this.auth0.authorize()
  }

  handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((error, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = ''
        this.getUserInfo(authResult)
      } else if (error) {
        console.error(`Error: ${error.error}`)
      }
    })
  }

  getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
      this.setSession(authResult, profile)
    })
  }

  private setSession(authResult, profile) {
    const expTime = authResult.expiresIn * 1000 + Date.now()
    // Save session data and update login status subject
    localStorage.setItem('expires_at', JSON.stringify(expTime))
    this.accessToken = authResult.accessToken
    this.user = profile
    this.setLoggedIn(true)
  }

  logout() {
    // Remove token and profile and update login status subject
    localStorage.removeItem('expires_at')
    this.accessToken = undefined
    this.user = undefined
    this.setLoggedIn(false)
  }

  get authenticated(): boolean {
    // Check if current date is greater than expiration
    // and user is currently logged in
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return Date.now() < expiresAt && this.loggedIn
  }
}

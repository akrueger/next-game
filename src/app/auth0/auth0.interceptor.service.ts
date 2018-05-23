// Angular
import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http'
// RxJS
import { Observable } from 'rxjs'
// Services
import { Auth0Service } from './auth0.service'

@Injectable()
export class Auth0BearerTokenInterceptor implements HttpInterceptor {
  constructor(public auth0: Auth0Service) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authenticatedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth0.accessToken}`
      }
    })
    return next.handle(authenticatedRequest)
  }
}

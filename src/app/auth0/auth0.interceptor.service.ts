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

@Injectable({
  providedIn: 'root'
})
export class Auth0BearerTokenInterceptor implements HttpInterceptor {
  constructor(private authService: Auth0Service) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authenticatedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
      }
    })
    return next.handle(authenticatedRequest)
  }
}

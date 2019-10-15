import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Auth0Service } from './auth0.service'
import { Observable, throwError } from 'rxjs'
import { mergeMap, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class Auth0BearerTokenInterceptor implements HttpInterceptor {
  constructor(private authService: Auth0Service) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getTokenSilently$().pipe(
      mergeMap(token => {
        const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        })
        return next.handle(tokenReq)
      }),
      catchError(error => throwError(error))
    )
  }
}

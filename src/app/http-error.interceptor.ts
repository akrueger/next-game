// Angular
import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http'
// RxJS
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'
// Services
import { MessageService } from 'primeng/api'

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = ''
        if (error.error instanceof ErrorEvent) {
          // Client error
          errorMessage = `Error: ${error.error.message}`
        } else {
          // Server error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
        }

        this.messageService.add({
          severity: 'error',
          summary: 'ERROR',
          detail: errorMessage,
          life: 5000
        })

        return throwError(errorMessage)
      })
    )
  }
}

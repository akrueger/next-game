// Angular
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core'
// RxJS
import { Observable, Subject, of } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
// Services
import { Auth0Service } from './auth0/auth0.service'
import { SpinnerService } from './modules/shared/spinner/spinner.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()
  public isLoading$: Observable<Boolean>

  constructor(
    private authService: Auth0Service,
    private spinnerService: SpinnerService
  ) {
    this.spinnerService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isLoading => (this.isLoading$ = of(isLoading)))
  }

  ngOnInit() {
    this.authService.localAuthSetup()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

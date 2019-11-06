// Angular
import { Component, OnInit, OnDestroy } from '@angular/core'
// RxJs
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
// Services
import { Auth0Service } from '../auth0/auth0.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()
  loggedIn: boolean
  headerTitle: string

  constructor(private authService: Auth0Service) {
    authService.loggedIn$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(loggedIn => {
        this.loggedIn = loggedIn
      })
  }

  ngOnInit() {}

  private logout() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

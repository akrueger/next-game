// Angular
import { Injectable, OnDestroy } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
// RxJS
import { Subject } from 'rxjs'

@Injectable()
export class GroupGuard implements CanActivate, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(private router: Router) {}

  canActivate() {
    if (5 < 4) {
      // Navigate where you came from
      this.router.navigate(['/login'])
      return false
    }

    return true
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

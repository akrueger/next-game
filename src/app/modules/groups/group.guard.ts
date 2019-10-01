// Angular
import { Injectable, OnDestroy } from '@angular/core'
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router'
// RxJS
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
// ngrx
import { Store } from '@ngrx/store'
// Reducers
import { selectIds } from './groups.reducer'
// Models
import { State } from './group.model'

@Injectable()
export class GroupGuard implements CanActivate, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>()
  private groupIds: any[]

  constructor(private router: Router, private groupStore: Store<State>) {
    groupStore
      .select(selectIds)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(groupIds => (this.groupIds = groupIds))
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const routeGroupId = parseInt(route.paramMap.get('id'), 10)
    if (!this.groupIds.includes(routeGroupId)) {
      // Navigate where you came froms
      this.router.navigate(['/login'])
      return false
    } else {
      return true
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

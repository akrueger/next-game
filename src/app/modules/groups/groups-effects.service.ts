// Angular
import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
// RxJS
import { of } from 'rxjs'
import { map, mergeMap, tap, catchError } from 'rxjs/operators'
// ngrx
import { Actions, createEffect, ofType } from '@ngrx/effects'
// Actions
import * as groupsActions from './groups.actions'
// Models
import { Group } from './group.model'
// Services
import { MessageService } from 'primeng/api'
import { GroupsService } from './groups.service'

@Injectable()
export class GroupsEffectsService {
  constructor(
    private messageService: MessageService,
    private router: Router,
    private actions$: Actions,
    private groupsService: GroupsService
  ) {}

  // Create Group
  createGroupsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(groupsActions.create),
      mergeMap(({ groupName }) => {
        return this.groupsService
          .createGroup(groupName)
          .pipe(
            map(
              (group: Group) => groupsActions.createSuccess({ group }),
              catchError((error: HttpErrorResponse) =>
                of(groupsActions.createFailure({ error }))
              )
            )
          )
      })
    )
  )

  createGroupsEffectSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(groupsActions.createSuccess),
        tap(({ group }) =>
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${group.name} successfully added`
          })
        )
      ),
    { dispatch: false }
  )

  createGroupsEffectFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(groupsActions.createFailure),
        tap(({ error }) =>
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: error.message,
            life: 5000
          })
        )
      ),
    { dispatch: false }
  )

  // // Logout
  // @Effect()
  // logoutUserEffect: Observable<loginActions.Actions> = this.actions$
  //   .ofType(loginActions.LOGOUT_USER)
  //   .pipe(
  //     map((action: loginActions.LogoutUser) => action),
  //     mergeMap(() => {
  //       return this.loginService.logout().pipe(
  //         map(() => new loginActions.LogoutUserSuccess()),
  //         catchError((error: HttpErrorResponse) =>
  //           of(new loginActions.LogoutUserFailure(error))
  //         )
  //       )
  //     })
  //   )

  // @Effect({ dispatch: false })
  // logoutUserEffectSuccess$ = this.actions$
  //   .ofType(loginActions.LOGOUT_USER_SUCCESS)
  //   .pipe(tap(() => this.router.navigate(['/login'])))

  // @Effect()
  // logoutUserEffectFailure$: Observable<
  //   errorsActions.Actions
  // > = this.actions$.ofType(loginActions.LOGOUT_USER_FAILURE).pipe(
  //   map(
  //     (action: loginActions.LogoutUserFailure) =>
  //       new errorsActions.Error(action.payload)
  //   ),
  //   tap(() => this.router.navigate(['/login']))
  // )

  // // Redirect
  // @Effect({ dispatch: false })
  // loginEffectRedirect$ = this.actions$.ofType(loginActions.LOGIN_REDIRECT).pipe(
  //   tap(() => {
  //     this.router.navigate(['/login'])
  //   })
  // )
}

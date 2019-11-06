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
import * as gamesActions from './games.actions'
// Models
import { Game } from './game.model'
// Services
// import { MessageService } from 'primeng/api'
import { GamesService } from './games.service'

@Injectable()
export class GamesEffectsService {
  constructor(
    private router: Router,
    private actions$: Actions,
    private gamesService: GamesService
  ) {}

  // Create Game
  createGamesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.create),
      mergeMap(({ gameName }) => {
        return this.gamesService
          .createGame(gameName)
          .pipe(
            map(
              (game: Game) => gamesActions.createSuccess({ game }),
              catchError((error: HttpErrorResponse) =>
                of(gamesActions.createFailure({ error }))
              )
            )
          )
      })
    )
  )

  createGamesEffectSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(gamesActions.createSuccess),
        tap(
          ({ game }) => null
          // TODO: replace
          // this.messageService.add({
          //   severity: 'success',
          //   summary: 'Success',
          //   detail: `${game.name} successfully added`
          // })
        )
      ),
    { dispatch: false }
  )

  createGamesEffectFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(gamesActions.createFailure),
        tap(
          ({ error }) => null
          // TODO: replace
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'ERROR',
          //   detail: error.message,
          //   life: 5000
          // })
        )
      ),
    { dispatch: false }
  )

  // Destroy Game
  destroyGamesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamesActions.destroy),
      mergeMap(({ game }) => {
        return this.gamesService
          .destroyGame(game.id)
          .pipe(
            map(
              () => gamesActions.destroySuccess({ game }),
              catchError((error: HttpErrorResponse) =>
                of(gamesActions.createFailure({ error }))
              )
            )
          )
      })
    )
  )

  destroyGamesEffectSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(gamesActions.destroySuccess),
        tap(
          ({ game }) =>
            // TODO: replace
            null
          // this.messageService.add({
          //   severity: 'success',
          //   summary: 'Success',
          //   detail: `${game.name} successfully deleted`
          // })
        )
      ),
    { dispatch: false }
  )

  destrpyGamesEffectFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(gamesActions.destroyFailure),
        tap(
          ({ error }) => null
          // TODO: replace
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'ERROR',
          //   detail: error.message,
          //   life: 5000
          // })
        )
      ),
    { dispatch: false }
  )
}

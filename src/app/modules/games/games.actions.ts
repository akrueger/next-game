// Angular
import { HttpErrorResponse } from '@angular/common/http'
// ngrx
import { createAction, props } from '@ngrx/store'
// Models
import { Game } from './game.model'

export const initialize = createAction(
  '[GAME] Initialize',
  props<{ games: Game[] }>()
)

export const create = createAction(
  '[GAME] Create',
  props<{ gameName: string }>()
)

export const createSuccess = createAction(
  '[GAME] CreateSuccess',
  props<{ game: Game }>()
)

export const createFailure = createAction(
  '[GAME] CreateFailure',
  props<{ error: HttpErrorResponse }>()
)

export const destroy = createAction('[GAME] Destroy', props<{ game: Game }>())

export const destroySuccess = createAction(
  '[GAME] DestroySuccess',
  props<{ game: Game }>()
)

export const destroyFailure = createAction(
  '[GAME] DestroyFailure',
  props<{ error: HttpErrorResponse }>()
)

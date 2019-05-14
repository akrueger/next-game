// ngrx
import { Action } from '@ngrx/store'

// Actions
export const LOADING = '[LOADING] Loading'

// Action creators
export class Loading implements Action {
  readonly type = LOADING

  constructor(public payload: Boolean) {}
}

export type Actions = Loading

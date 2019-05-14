// Angular
import { HttpErrorResponse } from '@angular/common/http'
// ngrx
import { Action } from '@ngrx/store'
// Actions
export const LOGIN_USER = '[LOGIN] LoginUser'
export const LOGIN_USER_SUCCESS = '[LOGIN] LoginUserSuccess'
export const LOGIN_USER_FAILURE = '[LOGIN] LoginUserFailure'
export const LOGOUT_USER = '[LOGIN] LogoutUser'
export const LOGOUT_USER_SUCCESS = '[LOGIN] LogoutUserSuccess'
export const LOGOUT_USER_FAILURE = '[LOGIN] LogoutUserFailure'
export const LOGIN_REDIRECT = '[LOGIN] LoginRedirect'

// Action creators
export class LoginUser implements Action {
  readonly type = LOGIN_USER

  constructor(public payload) {}
}

export class LoginUserSuccess implements Action {
  readonly type = LOGIN_USER_SUCCESS

  constructor(public payload: Response) {}
}

export class LoginUserFailure implements Action {
  readonly type = LOGIN_USER_FAILURE

  constructor(public payload: HttpErrorResponse) {}
}

export class LogoutUser implements Action {
  readonly type = LOGOUT_USER
}

export class LogoutUserSuccess implements Action {
  readonly type = LOGOUT_USER_SUCCESS
}

export class LogoutUserFailure implements Action {
  readonly type = LOGOUT_USER_FAILURE

  constructor(public payload: HttpErrorResponse) {}
}

export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT
}

export type Actions =
  | LoginUser
  | LoginUserSuccess
  | LoginUserFailure
  | LogoutUser
  | LogoutUserSuccess
  | LogoutUserFailure
  | LoginRedirect

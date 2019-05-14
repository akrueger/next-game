// Angular
import { HttpErrorResponse } from '@angular/common/http'
// ngrx
import { createAction, props } from '@ngrx/store'
// Models
import { Group } from './group.model'

export const initialize = createAction(
  '[GROUP] Initialize',
  props<{ groups: Group[] }>()
)

export const create = createAction(
  '[GROUP] Create',
  props<{ groupName: string }>()
)

export const createSuccess = createAction(
  '[GROUP] CreateSuccess',
  props<{ group: Group }>()
)

export const createFailure = createAction(
  '[GROUP] CreateFailure',
  props<{ error: HttpErrorResponse }>()
)

// // Actions
// export const CREATE = '[GROUP] Create'
// export const UPDATE = '[GROUP] Update'
// export const DELETE = '[GROUP] Delete'

// // Action creators
// export class Create implements Action {
//   readonly type = CREATE

//   constructor(public group: Group) {}
// }

// export class Update implements Action {
//   readonly type = UPDATE
//   constructor(public id: string, public changes: Partial<Group>) {}
// }

// export class Delete implements Action {
//   readonly type = DELETE
//   constructor(public id: string) {}
// }

// export type Actions = Create | Update | Delete

// Actions
import * as loginActions from '../login/login.actions'

export const initialState = false

export function reducer(state = initialState, action: loginActions.Actions) {
  switch (action.type) {
    case loginActions.LOGIN_USER:
      return state

    case loginActions.LOGIN_USER_SUCCESS:
      return true

    case loginActions.LOGIN_USER_FAILURE:
      return false

    case loginActions.LOGOUT_USER:
      return state

    case loginActions.LOGOUT_USER_SUCCESS:
      return state

    case loginActions.LOGOUT_USER_FAILURE:
      return state

    case loginActions.LOGIN_REDIRECT:
      return state

    default:
      return state
  }
}

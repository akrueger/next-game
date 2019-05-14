// Actions
import * as loadingActions from './loading.actions'

export const initialState = false

export function reducer(state = initialState, action: loadingActions.Actions) {
  switch (action.type) {
    case loadingActions.LOADING:
      return action.payload

    default:
      return state
  }
}

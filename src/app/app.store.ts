// Angular
import { RouterStateSnapshot } from '@angular/router'
// ngrx
import { ActionReducer, ActionReducerMap, createSelector } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'
import { storeLogger } from 'ngrx-store-logger'
import {
  RouterReducerState,
  routerReducer,
  RouterStateSerializer
} from '@ngrx/router-store'
import { localStorageSync } from 'ngrx-store-localstorage'
// Branch reducers
import * as loadingReducer from './loading/loading.reducer'
// Actions
import * as loginActions from './login/login.actions'
// Configuration
import { environment } from '../environments/environment'

// Root state
export interface State {
  router: RouterReducerState<RouterStateUrl>
  loading: Boolean
}

export interface RouterStateUrl {
  url: string
}

// Custom router-store state serializer
export class RouterSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState

    // Only return an object including the URL instead of the entire snapshot
    return { url }
  }
}

// Root reducers map
export const rootReducers: ActionReducerMap<State> = {
  router: routerReducer,
  loading: loadingReducer.reducer
}

// Browser console store logging
export function loggerReducer(
  reducer: ActionReducer<State>
): ActionReducer<any> {
  // default, no options
  return storeLogger()(reducer)
}

// Synchronize browser session storage with slices of store -- used to rehydrate the store as long as browser tab session remains open
export function localStorageSyncReducer(
  reducer: ActionReducer<State>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['groups', 'games'],
    storage: sessionStorage,
    rehydrate: true
  })(reducer)
}

// Clear out entire store -- used on logout
export function clearStoreReducer(
  reducer: ActionReducer<State>
): ActionReducer<any> {
  return function(state, action) {
    switch (action.type) {
      case loginActions.LOGOUT_USER_SUCCESS:
        // Preserve router state (otherwise it begins life as undefined post-logout)
        const { router } = state
        state = { router }
        return reducer(state, action)

      default:
        return reducer(state, action)
    }
  }
}

export const metaReducers = environment.production
  ? [clearStoreReducer]
  : [clearStoreReducer, localStorageSyncReducer, loggerReducer, storeFreeze]

// Selectors
export const getState = (state: State) => state
export const getRouterState = (state: State) => state.router
export const getLoadingState = (state: State) => state.loading

export const getRouter = createSelector(
  getState,
  getRouterState
)

export const getLoading = createSelector(
  getState,
  getLoadingState
)

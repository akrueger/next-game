// ngRx
import { createReducer, on, createFeatureSelector } from '@ngrx/store'
// Actions
import * as gamesActions from './games.actions'
// Models
import { initialState, State, adapter } from './game.model'

export const reducer = createReducer<State>(
  initialState,
  on(
    gamesActions.initialize,
    (state, { games }): State => adapter.addAll(games, state)
  ),
  on(gamesActions.create, (state, { gameName }): State => state),
  on(
    gamesActions.createSuccess,
    (state, { game }): State => adapter.addOne(game, state)
  ),
  on(gamesActions.createFailure, (state): State => state),
  on(gamesActions.destroy, (state): State => state),
  on(gamesActions.destroySuccess, (state): State => state),
  on(gamesActions.destroyFailure, (state): State => state)
)

// Selectors
export const getGamesState = createFeatureSelector<State>('games')

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors(getGamesState)

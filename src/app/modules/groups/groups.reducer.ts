// ngRx
import { createReducer, on, createFeatureSelector } from '@ngrx/store'
// Actions
import * as groupsActions from './groups.actions'
// Models
import { initialState, State, adapter } from './group.model'

export const reducer = createReducer<State>(
  initialState,
  on(
    groupsActions.initialize,
    (state, { groups }): State => adapter.addAll(groups, state)
  ),
  on(groupsActions.create, (state, { groupName }): State => state),
  on(
    groupsActions.createSuccess,
    (state, { group }): State => adapter.addOne(group, state)
  ),
  on(groupsActions.createFailure, (state): State => state)
)

// Selectors
export const getGroupsState = createFeatureSelector<State>('groups')

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors(getGroupsState)

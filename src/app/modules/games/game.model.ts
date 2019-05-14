import { EntityState, createEntityAdapter } from '@ngrx/entity'

export interface Game {
  id: string
  name: string
}

export const adapter = createEntityAdapter<Game>()

export interface State extends EntityState<Game> {}

// Initial state
const initialGames = {
  ids: [],
  entities: {}
}

export const initialState: State = adapter.getInitialState(initialGames)

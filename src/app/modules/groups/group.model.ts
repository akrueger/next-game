// ngrx
import { EntityState, createEntityAdapter } from '@ngrx/entity'
// Models
import { User } from '../../auth0/user.model'

export interface Group {
  id: string
  name: string
  members: User[]
  admins: User[]
}

export const adapter = createEntityAdapter<Group>()

export interface State extends EntityState<Group> {}

// Initial state
const initialGroups = {
  ids: [],
  entities: {}
}

export const initialState: State = adapter.getInitialState(initialGroups)

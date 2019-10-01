// ngrx
import { EntityState, createEntityAdapter } from '@ngrx/entity'
// Models
import { User } from '../../auth0/user.model'

export interface Group {
  id: string
  name: string
}

export const adapter = createEntityAdapter<Group>()

export interface State extends EntityState<Group> {
  members: User[]
  admins: User[]
}

// Initial state
const initialGroups = {
  ids: [],
  entities: {},
  members: [],
  admins: []
}

export const initialState: State = adapter.getInitialState(initialGroups)

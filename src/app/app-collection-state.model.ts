// Models
import { Group } from './modules/groups/group.model'
import { Game } from './modules/games/game.model'

export interface AppCollectionState {
  groups: Group[]
  games: Game[]
}

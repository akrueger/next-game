// Angular
import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
// RxJS
import { map } from 'rxjs/operators'
// ngRx
import { Store } from '@ngrx/store'
// Actions
import * as groupsActions from './modules/groups/groups.actions'
import * as gamesActions from './modules/games/games.actions'
// Models
import { AppCollectionState } from './app-collection-state.model'
import { State as GroupState } from './modules/groups/group.model'
import { State as GameState } from './modules/games/game.model'
// Services
import { StateInitializerService } from './state-initializer.service'

@Injectable({
  providedIn: 'root'
})
export class StateInitializerResolver implements Resolve<any> {
  constructor(
    private groupsStore: Store<GroupState>,
    private gamesStore: Store<GameState>,
    private stateInitializerService: StateInitializerService
  ) {}

  resolve() {
    const { groups, games } = this.getStorage()
    if (groups && groups.ids.length > 0) {
      return { groups, games }
    } else {
      return this.stateInitializerService.getState().pipe(
        map((state: AppCollectionState) => {
          this.groupsStore.dispatch(groupsActions.initialize(state))
          this.gamesStore.dispatch(gamesActions.initialize(state))
          return state
        })
      )
    }
  }

  private getStorage() {
    try {
      const groups: GroupState = JSON.parse(sessionStorage.getItem('groups'))
      const games: GameState = JSON.parse(sessionStorage.getItem('games'))

      return {
        groups,
        games
      }
    } catch (error) {}
  }
}

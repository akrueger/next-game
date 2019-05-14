// Angular
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms'
// RxJS
import { Observable } from 'rxjs'
// ngRx
import { Store } from '@ngrx/store'
// Actions
import * as groupActions from '../modules/groups/groups.actions'
import * as gamesActions from '../modules/games/games.actions'
// Reducers
import * as fromGroups from '../modules/groups/groups.reducer'
import * as fromGames from '../modules/games/games.reducer'
// Models
import { State as GroupState } from '../modules/groups/group.model'
import { State as GameState } from '../modules/games/game.model'
// Services
import { GroupsService } from '../modules/groups/groups.service'
import { GamesService } from '../modules/games/games.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  groups$: Observable<any>
  games$: Observable<any>
  gameForm: FormGroup

  constructor(
    private groupsStore: Store<GroupState>,
    private gamesStore: Store<GameState>,
    private groupsService: GroupsService,
    private gamesService: GamesService,
    private router: Router
  ) {
    this.groups$ = this.groupsStore.select(fromGroups.selectAll)
    this.games$ = this.gamesStore.select(fromGames.selectAll)
  }

  ngOnInit() {
    this.gameForm = new FormGroup({
      gameName: new FormControl()
    })
  }

  createGroup(groupName: string) {}

  createGame() {
    const gameName = this.gameForm.get('gameName').value
    this.gamesStore.dispatch(gamesActions.create({ gameName }))
    this.gameForm.reset()
  }

  openGroup(groupId: number) {
    this.router.navigate([`/group/${groupId}`])
  }
}

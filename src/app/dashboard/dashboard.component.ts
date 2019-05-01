// Angular
import { Component } from '@angular/core'
import { RestService } from '../app.component.service'
import { Observable, of } from 'rxjs'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  groups$: Observable<any>
  games$: Observable<any>
  game$: Observable<any>
  users$: Observable<any>

  constructor(private restService: RestService) {}

  getGames() {
    this.restService.getGames().subscribe(games => (this.games$ = of(games)))
  }

  getGroupsByUserId(userId: number) {
    this.restService
      .getGroupsByUserId(userId)
      .subscribe(groups => (this.groups$ = of(groups)))
  }

  createGroup(groupName: string) {
    this.restService
      .createGroup(groupName)
      .subscribe(groups => (this.groups$ = of(groups)))
  }

  getGameById(gameId: number) {
    this.restService
      .getGameById(gameId)
      .subscribe(game => (this.game$ = of(game)))
  }

  getGameByName(gameName: string) {
    this.restService
      .getGameByName(gameName)
      .subscribe(game => (this.game$ = of(game)))
  }

  createGame(gameName: string) {
    this.restService
      .createGame(gameName)
      .subscribe(game => (this.game$ = of(game)))
  }

  deleteGameById(gameId: number) {
    this.restService
      .deleteGameById(gameId)
      .subscribe(game => (this.game$ = of(game)))
  }

  deleteGameByName(gameName: string) {
    this.restService
      .deleteGameByName(gameName)
      .subscribe(game => (this.game$ = of(game)))
  }

  getUsers() {
    this.restService.getUsers().subscribe(users => (this.users$ = of(users)))
  }
}

// Angular
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
// Models
import { AppCollectionState } from './app-collection-state.model'
import { Group } from './modules/groups/group.model'

@Injectable()
export class RestService {
  constructor(private http: HttpClient) {}

  // State
  getState() {
    return this.http.get<AppCollectionState>('api/state')
  }

  // Users //
  getUsers() {
    return this.http.get('api/users')
  }

  // Games //
  getGames() {
    return this.http.get('api/games')
  }

  getGameById(gameId: number) {
    return this.http.get(`api/games/${gameId}`)
  }

  getGameByName(gameName: string) {
    return this.http.get(`api/games/${gameName}`)
  }

  createGame(name: string) {
    return this.http.post('api/games', { name })
  }

  destroyGameById(id: string) {
    return this.http.delete(`api/games/${id}`)
  }

  deleteGameByName(gameName: string) {
    return this.http.delete(`api/games/${gameName}`)
  }

  // Groups //
  getGroups() {
    return this.http.get<Group[]>('api/groups')
  }

  createGroup(groupName: string) {
    return this.http.post<Group>('api/groups', {
      groupName
    })
  }

  deleteGroup(groupId: number) {
    return this.http.delete(`api/groups/${groupId}`, { responseType: 'text' })
  }

  searchGame(gameName: string) {
    const params = new HttpParams({
      fromObject: { gameName }
    })

    return this.http.get('api/games/search', { params })
  }
}

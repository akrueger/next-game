// Angular
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable()
export class RestService {
  constructor(private http: HttpClient) {}

  // Users
  getUsers() {
    return this.http.get('api/users')
  }

  // Games
  getGames() {
    return this.http.get('api/games')
  }

  getGameById(gameId: number) {
    return this.http.get(`api/games/${gameId}`)
  }

  getGameByName(gameName: string) {
    return this.http.get(`api/games/${gameName}`)
  }

  createGame(gameName: string) {
    return this.http.post('api/games', { gameName })
  }

  deleteGameById(gameId: number) {
    return this.http.delete(`api/games/${gameId}`)
  }

  deleteGameByName(gameName: string) {
    return this.http.delete(`api/games/${gameName}`)
  }

  // Groups
  getGroups() {
    return this.http.get('api/groups')
  }

  getGroupsByUserId(userId: number) {
    const params = new HttpParams({
      fromObject: {
        userId: userId.toString()
      }
    })

    return this.http.get('api/groups', { params })
  }

  createGroup(groupName: string) {
    return this.http.post('api/groups', {
      groupName
    })
  }
}

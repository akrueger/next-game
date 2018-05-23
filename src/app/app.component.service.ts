// Native angular modules
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable()
export class RestService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('api/users')
  }

  getGames() {
    return this.http.get('api/games')
  }

  getGame(id) {
    return this.http.get(`api/games/${id}`)
  }

  createGame(name: string) {
    return this.http.post('api/games', { name })
  }

  deleteGame(name: string) {
    return this.http.delete(`api/games/${name}`)
  }

  getGroups() {
    return this.http.get('api/groups')
  }
}

// Angular
import { Injectable } from '@angular/core'
// Models
import { Game } from './game.model'
// Services
import { RestService } from '../../rest.service'

@Injectable()
export class GamesService {
  constructor(private restService: RestService) {}

  createGame(name: string) {
    return this.restService.createGame(name)
  }

  destroyGame(id: string) {
    return this.restService.destroyGameById(id)
  }
}

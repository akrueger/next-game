// Angular
import { Injectable } from '@angular/core'
// Services
import { RestService } from './rest.service'

@Injectable()
export class StateInitializerService {
  constructor(private restService: RestService) {}

  getState() {
    return this.restService.getState()
  }
}

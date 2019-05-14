// Angular
import { Injectable } from '@angular/core'
// Services
import { RestService } from '../../rest.service'

@Injectable()
export class GroupsService {
  constructor(private restService: RestService) {}

  createGroup(name: string) {
    return this.restService.createGroup(name)
  }
}

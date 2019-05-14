// Angular
import { Injectable } from '@angular/core'
// RxJS
import { BehaviorSubject } from 'rxjs'
// Models
import { User } from '../auth0/user.model'

@Injectable()
export class ProfileService {
  userProfile$ = new BehaviorSubject<User>(null)

  public setUserProfile(value: User) {
    this.userProfile$.next(value)
  }
}

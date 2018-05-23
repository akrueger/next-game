// Angular
import { Injectable } from '@angular/core'
// RxJS
import { Subject } from 'rxjs'

@Injectable()
export class SpinnerService {
  isLoading$: Subject<boolean> = new Subject<boolean>()

  setLoading(value: boolean) {
    this.isLoading$.next(value)
  }
}

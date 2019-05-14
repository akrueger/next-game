// Angular
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
// RxJS
import { Observable } from 'rxjs'
// ngRx
import { Store } from '@ngrx/store'
// Reducers
import * as fromGroups from './groups.reducer'
// Models
import { State } from './group.model'

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  groups: Observable<any>

  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {
    this.groups = this.store.select(fromGroups.selectAll)
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard'])
  }
}

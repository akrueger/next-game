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
  games$: Observable<any>

  constructor(private restService: RestService) {}

  getGames() {
    this.restService.getGames().subscribe(games => (this.games$ = of(games)))
  }
}

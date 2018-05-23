// Angular
import { Component, OnInit } from '@angular/core'
// RxJS
import { Observable, of } from 'rxjs'
// Services
import { SpinnerService } from './spinner/spinner.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading$: Observable<Boolean>
  // allUsers$: Observable<any>
  // allGames$: Observable<any>
  // allGroups$: Observable<any>
  // game$: Observable<any>
  // gameCreated$: Observable<string>
  // gameDeleted$: Observable<string>

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.isLoading$.subscribe(
      isLoading => (this.isLoading$ = of(isLoading))
    )
  }

  ngOnInit() {}

  setLoading(value: boolean) {
    this.spinnerService.setLoading(value)
  }

  // getUsers() {
  //   this.restService.getUsers().subscribe(users => (this.allUsers$ = of(users)))
  // }

  // getGame() {
  //   this.restService.getGame(2).subscribe(game => (this.game$ = of(game)))
  // }

  // createGame(name: string) {
  //   this.restService
  //     .createGame(name)
  //     .subscribe(response => console.log(response))
  // }

  // deleteGame(name: string) {
  //   this.restService
  //     .deleteGame(name)
  //     .subscribe(response => console.log(response))
  // }

  // getGames() {
  //   this.restService.getGames().subscribe(games => (this.allGames$ = of(games)))
  // }

  // getGroups() {
  //   this.restService
  //     .getGroups()
  //     .subscribe(groups => (this.allGroups$ = of(groups)))
  // }
}

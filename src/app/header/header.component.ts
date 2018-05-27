// Angular
import { Component, OnInit } from '@angular/core'
// Services
import { Auth0Service } from '../auth0/auth0.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private auth0Service: Auth0Service) {}

  ngOnInit() {}

  login() {
    this.auth0Service.login()
  }

  logout() {
    this.auth0Service.logout()
  }
}

// Angular
import { Component, OnInit } from '@angular/core'
// PrimeNG
import { MenuItem } from 'primeng/api'
// Services
import { Auth0Service } from '../auth0/auth0.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerTitle: string
  items: MenuItem[]

  constructor(private authService: Auth0Service) {}

  ngOnInit() {
    this.items = [
      {
        items: [{ label: 'Logout', icon: 'pi pi-eject' }]
      }
    ]
  }

  login() {
    this.authService.login()
  }

  logout() {
    this.authService.logout()
  }
}

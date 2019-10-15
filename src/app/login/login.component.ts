// Angular
import { Component, ChangeDetectionStrategy } from '@angular/core'
// Services
import { Auth0Service } from '../auth0/auth0.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  constructor(private authService: Auth0Service) {}

  login() {
    this.authService.login()
  }
}

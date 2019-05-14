// Angular
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// Services
import { Auth0Service } from '../auth0/auth0.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth0Service
  ) {}

  ngOnInit() {
    // this.dataService.headerTitle$.next('')
    this.buildForm()
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this.authService.login()
  }
}

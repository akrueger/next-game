// Angular
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// Services
import { Auth0Service } from '../auth0/auth0.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private auth0Service: Auth0Service
  ) {}

  ngOnInit() {
    this.buildForm()
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this.auth0Service.login()
  }
}

// Angular
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
// Application modules
import { AppRoutingModule } from './app.routing'
// Material
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
// Components
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { HomeComponent } from './home/home.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProfileComponent } from './profile/profile.component'
import { GroupComponent } from './group/group.component'
import { GroupSettingsComponent } from './group/group-settings.component'
import { Auth0ResolutionComponent } from './auth0/auth0.resolution.component'
import { SpinnerComponent } from './spinner/spinner.component'
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component'
// Services
import { Auth0Service } from './auth0/auth0.service'
import { Auth0BearerTokenInterceptor } from './auth0/auth0.interceptor.service'
import { RestService } from './app.component.service'
import { SpinnerService } from './spinner/spinner.service'
// Guards
import { AuthGuard } from './auth0/auth.guard'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    GroupComponent,
    GroupSettingsComponent,
    Auth0ResolutionComponent,
    SpinnerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule // must be last
  ],
  providers: [
    Auth0Service,
    RestService,
    SpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Auth0BearerTokenInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

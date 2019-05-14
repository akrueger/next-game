// Angular
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
// Components
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProfileComponent } from './profile/profile.component'
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component'
// Guards
import { AuthGuard } from './auth0/auth.guard'
// Resolver
import { StateInitializerResolver } from './state-initializer-resolver.service'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: { state: StateInitializerResolver },
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

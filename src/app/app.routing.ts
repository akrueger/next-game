// Angular
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
// Components
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProfileComponent } from './profile/profile.component'
import { GroupComponent } from './group/group.component'
import { GroupSettingsComponent } from './group/group-settings.component'
import { Auth0ResolutionComponent } from './auth0/auth0.resolution.component'
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component'
// Guards
import { AuthGuard } from './auth0/auth.guard'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'group',
    component: GroupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'group/settings',
    component: GroupSettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth0-resolution',
    component: Auth0ResolutionComponent
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

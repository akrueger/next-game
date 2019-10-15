// Angular
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
// Components
import { Auth0CallbackComponent } from './auth0/auth0callback.component'
import { GroupComponent } from './modules/groups/group.component'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProfileComponent } from './profile/profile.component'
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component'
// Guards
import { AuthGuard } from './auth0/auth.guard'
import { GroupGuard } from './modules/groups/group.guard'
// Resolver
import { StateInitializerResolver } from './state-initializer-resolver.service'

const routes: Routes = [
  {
    path: 'callback',
    component: Auth0CallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // resolve: { state: StateInitializerResolver },
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'group/:id',
  //   component: GroupComponent,
  //   canActivate: [AuthGuard, GroupGuard],
  //   loadChildren: './modules/groups/groups.module#GroupsModule'
  // },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
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

// Angular
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
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
// Services
import { Auth0BearerTokenInterceptor } from './auth0/auth0.interceptor.service'
import { HttpErrorInterceptor } from './http-error.interceptor'

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
  {
    path: 'group/:id',
    component: GroupComponent,
    canActivate: [AuthGuard, GroupGuard],
    loadChildren: () =>
      import('./modules/groups/groups.module').then(m => m.GroupsModule)
  },
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
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Auth0BearerTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class AppRoutingModule {}

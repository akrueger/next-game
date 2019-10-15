// Angular
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
// Application modules
import { AppRoutingModule } from './app.routing'
import { SharedModule } from './modules/shared/shared.module'
import { GroupsModule } from './modules/groups/groups.module'
import { GamesModule } from './modules/games/games.module'
// ngRx
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store'
import { RouterSerializer } from './app.store'
// Store
import { rootReducers, metaReducers } from './app.store'
// Components
import { AppComponent } from './app.component'
import { Auth0CallbackComponent } from './auth0/auth0callback.component'
import { HeaderComponent } from './header/header.component'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProfileComponent } from './profile/profile.component'
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component'
// Configuration
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    Auth0CallbackComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducers, {
      metaReducers
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    SharedModule,
    GroupsModule,
    GamesModule,
    AppRoutingModule // must be last
  ],
  providers: [{ provide: RouterStateSerializer, useClass: RouterSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}

// Angular
import { NgModule } from '@angular/core'
// Application Modules
import { SharedModule } from '../shared/shared.module'
// ngrx
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
// Reducer
import { reducer } from './games.reducer'
// Services
import { GamesService } from './games.service'
import { GamesEffectsService } from './games-effects.service'

@NgModule({
  imports: [
    StoreModule.forFeature('games', reducer),
    EffectsModule.forFeature([GamesEffectsService]),
    SharedModule
  ],
  providers: [GamesService]
})
export class GamesModule {}

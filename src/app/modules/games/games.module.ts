// Angular
import { NgModule, InjectionToken } from '@angular/core'
// Application Modules
import { SharedModule } from '../shared/shared.module'
// ngrx
import { StoreModule, ActionReducerMap } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
// Reducer
import { reducer } from './games.reducer'
// Models
import { State } from './game.model'
// Services
import { GamesService } from './games.service'
import { GamesEffectsService } from './games-effects.service'

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<State>
>('Feature Reducers')

@NgModule({
  imports: [
    StoreModule.forFeature('games', FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([GamesEffectsService]),
    SharedModule
  ],
  providers: [
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: reducer
    },
    GamesService
  ]
})
export class GamesModule {}

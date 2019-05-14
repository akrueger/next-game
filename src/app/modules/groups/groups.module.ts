// Angular
import { NgModule, InjectionToken } from '@angular/core'
// Application Modules
import { SharedModule } from '../shared/shared.module'
import { GroupsRoutingModule } from './groups.routing'
// ngrx
import { StoreModule, ActionReducerMap } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
// Reducer
import { reducer } from './groups.reducer'
// Components
import { GroupComponent } from './group.component'
// Models
import { State } from './group.model'
// Services
import { GroupsService } from './groups.service'
import { GroupsEffectsService } from './groups-effects.service'
// Guards
import { GroupGuard } from './group.guard'

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<State>
>('Feature Reducers')

@NgModule({
  imports: [
    StoreModule.forFeature('groups', FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([GroupsEffectsService]),
    SharedModule,
    GroupsRoutingModule
  ],
  exports: [GroupComponent],
  declarations: [GroupComponent],
  providers: [
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: reducer
    },
    GroupsService,
    GroupGuard
  ]
})
export class GroupsModule {}

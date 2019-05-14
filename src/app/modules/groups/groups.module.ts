// Angular
import { NgModule } from '@angular/core'
import { GroupComponent } from './group.component'
// Application Modules
import { SharedModule } from '../shared/shared.module'
import { GroupsRoutingModule } from './groups.routing'
// ngrx
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
// Reducer
import { reducer } from './groups.reducer'
// Services
import { GroupsService } from './groups.service'
// Guards
import { GroupGuard } from './group.guard'

@NgModule({
  imports: [
    StoreModule.forFeature('groups', reducer),
    EffectsModule.forFeature([]),
    SharedModule,
    GroupsRoutingModule
  ],
  exports: [GroupComponent],
  declarations: [GroupComponent],
  providers: [GroupsService, GroupGuard]
})
export class GroupsModule {}

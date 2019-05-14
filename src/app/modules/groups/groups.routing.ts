// Angular
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
// Components
import { GroupComponent } from './group.component'
// Guards
import { AuthGuard } from '../../auth0/auth.guard'
import { GroupGuard } from './group.guard'

const routes: Routes = [
  {
    path: 'group/:id',
    component: GroupComponent,
    canActivate: [AuthGuard, GroupGuard]
  }
  // {
  //   path: 'group/:id/settings',
  //   component: GroupSettingsComponent,
  //   canActivate: [AuthGuard]
  // }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}

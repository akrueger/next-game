// Angular
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
// PrimeNG
import { ButtonModule } from 'primeng/button'
import { MenubarModule } from 'primeng/menubar'
import { MenuModule } from 'primeng/menu'
import { PanelModule } from 'primeng/panel'
import { DialogModule } from 'primeng/dialog'
import { CalendarModule } from 'primeng/calendar'
// import { TableModule } from 'primeng/table'
import { DataViewModule } from 'primeng/dataview'
import { FullCalendarModule } from 'primeng/fullcalendar'
import { ToolbarModule } from 'primeng/toolbar'
import { ToastModule } from 'primeng/toast'
import { TooltipModule } from 'primeng/tooltip'
import { ProgressBarModule } from 'primeng/progressbar'
// Application Components
import { SpinnerComponent } from './spinner/spinner.component'
// Services
import { MessageService } from 'primeng/api'
import { SpinnerService } from './spinner/spinner.service'

@NgModule({
  declarations: [SpinnerComponent],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    MenubarModule,
    MenuModule,
    PanelModule,
    DialogModule,
    CalendarModule,
    // TableModule,
    DataViewModule,
    FullCalendarModule,
    ToolbarModule,
    ToastModule,
    TooltipModule,
    ProgressBarModule,
    SpinnerComponent
  ],
  providers: [MessageService, SpinnerService]
})
export class SharedModule {}

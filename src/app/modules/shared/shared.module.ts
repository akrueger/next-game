// Angular
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
// Material
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material'
// Application Components
import { SpinnerComponent } from './spinner/spinner.component'
// Services
import { SpinnerService } from './spinner/spinner.service'

@NgModule({
  declarations: [SpinnerComponent],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SpinnerComponent
  ],
  providers: [SpinnerService]
})
export class SharedModule {}

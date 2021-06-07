import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field/form-field.component';
import { LoadingComponent } from './loading/loading.component';
import { IfUserDirective } from './if-user.directive';
import { IfNoUserDirective } from './if-no-user.directive';



@NgModule({
  declarations: [
    FormFieldComponent,
    LoadingComponent,
    IfUserDirective,
    IfNoUserDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [LoadingComponent, IfNoUserDirective, IfUserDirective,]
})
export class SharedModule { }

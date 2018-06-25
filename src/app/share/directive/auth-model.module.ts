import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthDirectiveDirective } from './auth-directive.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AuthDirectiveDirective
  ],
  exports: [
    AuthDirectiveDirective
  ]
})
export class AuthModelModule { }

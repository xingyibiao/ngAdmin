import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from '../pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../serves/login-service/login.service';
import { httpInterceptorProviders } from '../http-interceptors';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { RootComponent } from '../pages/root/root.component';
import { HeaderComponent } from '../components/header/header.component';
import { LeftMenuComponent } from '../components/left-menu/left-menu.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouteReuseStrategy } from '@angular/router';
import { SimpleReuseStrategy } from '../share/simple-reuse-strategy';
import { DefaultUrlPipe } from '../share/pipes/default-url.pipe';
import { LoginService } from '../serves/login-service/login.service';
import { AuthDirectiveDirective } from '../share/directive/auth-directive.directive';
//import { AuthDirectiveDirective } from '../share/directive/auth-directive.directive';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    MainRoutingModule,
    // AuthDirectiveDirective
  ],
  declarations: [
    DefaultUrlPipe,
    RootComponent,
    HeaderComponent,
    LeftMenuComponent,
    // AuthDirectiveDirective
  ],
  providers: [
    LoginService
  ]
})
export class MainModule { }

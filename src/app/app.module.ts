import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FileUploadModule } from 'ng2-file-upload'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd'
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors';
import { AuthServiceService } from './serves/auth-service/auth-service.service';
import { SimpleReuseStrategy } from './share/simple-reuse-strategy';
import { RouteReuseStrategy } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    NgZorroAntdModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    AuthServiceService,
    httpInterceptorProviders,
    { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy },
    { provide: NZ_I18N, useValue: zh_CN } // ng-zorro国际化服务，必须注入
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

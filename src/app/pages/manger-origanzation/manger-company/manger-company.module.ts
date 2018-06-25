import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangerCompanyRoutingModule } from './manger-company-routing.module';
import { MangerCompanyComponent } from './manger-company.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MangerCompanyService} from '../../../serves/manger-company/manger-company.service'
import { AuthModelModule } from '../../../share/directive/auth-model.module';

@NgModule({
  imports: [
    CommonModule,
    MangerCompanyRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    AuthModelModule
  ],
  declarations: [
    MangerCompanyComponent,
  ],
  providers:[
    MangerCompanyService
  ]
})
export class MangerCompanyModule { }

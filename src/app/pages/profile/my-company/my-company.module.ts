import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
// import { NgxEchartsModule } from "ngx-echarts";

import { MyCompanyRoutingModule } from './my-company-routing.module';
import { MyCompanyComponent } from './my-company.component';
import { MangerDepartmentService } from '../../../serves/manger-department/manger-department.service';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    // NgxEchartsModule,
    MyCompanyRoutingModule
  ],
  declarations: [MyCompanyComponent],
  providers: [
    MangerDepartmentService
  ]
})
export class MyCompanyModule { }

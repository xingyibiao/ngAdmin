import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDepartmentRoutingModule } from './my-department-routing.module';
import { MyDepartmentComponent } from './my-department.component';

import { MyDepartmentService } from '../../../serves/my-department/my-department.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';
@NgModule({
  imports: [
    CommonModule,
    MyDepartmentRoutingModule
  ],
  declarations: [
    MyDepartmentComponent
  ],
  providers: [
    MyDepartmentService
  ]
})
export class MyDepartmentModule { }

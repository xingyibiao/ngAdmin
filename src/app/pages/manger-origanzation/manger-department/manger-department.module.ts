import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangerDepartmentRoutingModule } from './manger-department-routing.module';
import { MangerDepartmentComponent } from './manger-department.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MangerDepartmentService } from '../../../serves/manger-department/manger-department.service';
import { AuthModelModule } from '../../../share/directive/auth-model.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    MangerDepartmentRoutingModule,
    AuthModelModule
  ],
  declarations: [
    MangerDepartmentComponent,
  ],
  providers: [
    MangerDepartmentService
  ]
})
export class MangerDepartmentModule { }

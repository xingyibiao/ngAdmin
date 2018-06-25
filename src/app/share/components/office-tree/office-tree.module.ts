import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeTreeComponent } from './office-tree.component';
import { MangerDepartmentService } from '../../../serves/manger-department/manger-department.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
  ],
  declarations: [
    OfficeTreeComponent
  ],
  providers: [
    MangerDepartmentService
  ],
  exports: [
    OfficeTreeComponent
  ]
})
export class OfficeTreeModule { }

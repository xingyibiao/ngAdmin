import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangerRoleRoutingModule } from './manger-role-routing.module';
import { MangerRoleComponent } from './manger-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MangerRoleService } from '../../../serves/manger-role/manger-role.service';
import { AuthModelModule } from '../../../share/directive/auth-model.module';

@NgModule({
  imports: [
    CommonModule,
    MangerRoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    AuthModelModule
  ],
  declarations: [
    MangerRoleComponent
  ],
  providers: [
    MangerRoleService
  ]
})
export class MangerRoleModule { }

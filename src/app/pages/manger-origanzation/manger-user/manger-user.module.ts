import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangerUserRoutingModule } from './manger-user-routing.module';
import { MangerUserComponent } from './manger-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AuthModelModule } from '../../../share/directive/auth-model.module';
import { MangerUserService } from '../../../serves/manger-user/manger-user.service';
import { PostTreeModule } from '../../../share/components/post-tree/post-tree.module';
import { OfficeTreeModule } from '../../../share/components/office-tree/office-tree.module';

@NgModule({
  imports: [
    CommonModule,
    MangerUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    AuthModelModule,
    PostTreeModule,
    OfficeTreeModule,
  ],
  declarations: [
    MangerUserComponent
  ],
  providers: [
    MangerUserService
  ]
})
export class MangerUserModule { }

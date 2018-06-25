import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangerPostRoutingModule } from './manger-post-routing.module';
import { MangerPostComponent } from './manger-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MangerPostService } from '../../../serves/manger-post/manger-post.service';
import { AuthModelModule } from '../../../share/directive/auth-model.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    MangerPostRoutingModule,
    AuthModelModule
  ],
  declarations: [
    MangerPostComponent,
  ],
  providers: [
    MangerPostService
  ]
})
export class MangerPostModule { }

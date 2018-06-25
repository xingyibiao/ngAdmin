import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPostRoutingModule } from './my-post-routing.module';
import { MyPostComponent } from './my-post.component';
import { MyPostService } from '../../../serves/my-post/my-post.service'

@NgModule({
  imports: [
    CommonModule,
    MyPostRoutingModule
  ],
  declarations: [
    MyPostComponent
  ],
  providers:[
    MyPostService
  ]
})
export class MyPostModule { }

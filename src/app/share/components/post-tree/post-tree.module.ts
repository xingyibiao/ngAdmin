import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostTreeComponent } from './post-tree.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { MangerPostService } from '../../../serves/manger-post/manger-post.service';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: [
    PostTreeComponent
  ],
  providers: [
    MangerPostService
  ],
  exports: [
    PostTreeComponent
  ]
})
export class PostTreeModule { }

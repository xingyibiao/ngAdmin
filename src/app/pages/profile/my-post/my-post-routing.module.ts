import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPostComponent } from './my-post.component' 
const routes: Routes = [
  {
    path: '',
    component: MyPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPostRoutingModule { }

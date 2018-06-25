import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MangerPostComponent } from './manger-post.component';

const routes: Routes = [
  {
    path: '',
    component: MangerPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangerPostRoutingModule { }

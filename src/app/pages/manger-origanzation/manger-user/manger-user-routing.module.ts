import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MangerUserComponent } from './manger-user.component';

const routes: Routes = [
  {
    path: '',
    component: MangerUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangerUserRoutingModule { }

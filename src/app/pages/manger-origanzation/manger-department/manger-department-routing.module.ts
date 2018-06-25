import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MangerDepartmentComponent } from './manger-department.component';

const routes: Routes = [
  {
    path: '',
    component: MangerDepartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangerDepartmentRoutingModule { }

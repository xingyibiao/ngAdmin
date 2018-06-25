import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDepartmentModule } from './my-department.module'
import { MyDepartmentComponent } from './my-department.component'
const routes: Routes = [
  {
    path: '',
    component:MyDepartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDepartmentRoutingModule { }

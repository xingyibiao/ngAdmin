import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MangerRoleComponent } from './manger-role.component'
const routes: Routes = [
  {
    path: '',
    component: MangerRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangerRoleRoutingModule { }

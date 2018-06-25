import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionDistributionComponent} from './permission-distribution.component'
const routes: Routes = [
  {
    path:'',
    component: PermissionDistributionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionDistributionRoutingModule { }

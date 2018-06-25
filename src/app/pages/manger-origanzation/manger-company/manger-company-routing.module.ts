import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MangerCompanyComponent } from './manger-company.component';
const routes: Routes = [
  {
    path: '',
    component: MangerCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangerCompanyRoutingModule { }

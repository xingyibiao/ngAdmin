import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockManComponent } from './stock-man.component'
const routes: Routes = [
  {
    path:'',
    component: StockManComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockManRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormDesignComponent } from './form-design.component';

const routes: Routes = [
  {
    path: '',
    component: FormDesignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormDesignRoutingModule { }

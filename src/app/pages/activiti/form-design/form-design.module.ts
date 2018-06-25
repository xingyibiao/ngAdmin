import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDesignRoutingModule } from './form-design-routing.module';
import { FormDesignComponent } from './form-design.component';

@NgModule({
  imports: [
    CommonModule,
    FormDesignRoutingModule
  ],
  declarations: [FormDesignComponent]
})
export class FormDesignModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcaComponent } from './pca.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { PcaService } from '../../../serves/pca/pca.service'
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: [
    PcaComponent
  ],
  providers:[
    PcaService
  ],
  exports: [
    PcaComponent
  ]
})
export class PcaModule { }

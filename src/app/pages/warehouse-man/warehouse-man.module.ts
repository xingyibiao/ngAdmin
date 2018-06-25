import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { WarehouseManRoutingModule } from './warehouse-man-routing.module';
import { WarehouseManComponent } from './warehouse-man.component';
import { WarehouseManService } from '../../serves/warehouseMan/warehouse-man.service';
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { PcaModule } from '../../share/components/pca/pca.module'
@NgModule({
  imports: [
    CommonModule,
    WarehouseManRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    PcaModule
  ],
  declarations: [WarehouseManComponent],
  providers:[
     WarehouseManService 
  ]
})
export class WarehouseManModule { }

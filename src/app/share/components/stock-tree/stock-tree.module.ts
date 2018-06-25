import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockTreeComponent } from './stock-tree.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { WarehouseManService } from '../../../serves/warehouseMan/warehouse-man.service';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: [StockTreeComponent],
  providers:[
    WarehouseManService
  ],
  exports: [
    StockTreeComponent
  ]
})
export class StockTreeModule { }

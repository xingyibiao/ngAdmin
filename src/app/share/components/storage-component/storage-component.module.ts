import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { StorageComponentComponent } from '../storage-component/storage-component.component';
import { WarehouseManService } from '../../../serves/warehouseMan/warehouse-man.service';
import { StockManService } from '../../../serves/stockMan/stock-man.service'
import { StockTreeModule } from '../../../share/components/stock-tree/stock-tree.module'
import { ProductTreeModule } from '../../../share/components/product-tree/product-tree.module'
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    StockTreeModule,
    ProductTreeModule
  ],
  declarations: [StorageComponentComponent],
  providers: [
    WarehouseManService,
    StockManService
  ],
  exports: [
    StorageComponentComponent
  ]
})
export class StorageComponentModule { }

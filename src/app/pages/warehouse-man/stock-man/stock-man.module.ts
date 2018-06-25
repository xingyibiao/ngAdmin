import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { StockManRoutingModule } from './stock-man-routing.module';
import { StockManComponent } from './stock-man.component';
import { StockManService } from '../../../serves/stockMan/stock-man.service'
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { StorageComponentModule } from '../../../share/components/storage-component/storage-component.module'
import { StockTreeModule } from '../../../share/components/stock-tree/stock-tree.module'
import { ProductTreeModule } from '../../../share/components/product-tree/product-tree.module'
@NgModule({
  imports: [
    CommonModule,
    StockManRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    StorageComponentModule,
    StockTreeModule,
    ProductTreeModule
  ],
  declarations: [StockManComponent],
  providers: [StockManService]
})
export class StockManModule { }

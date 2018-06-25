import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTreeComponent } from './product-tree.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { StockManService } from '../../../serves/stockMan/stock-man.service'
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: [ProductTreeComponent],
  providers: [
    StockManService
  ],
  exports: [
    ProductTreeComponent
  ]
})
export class ProductTreeModule { }

import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {  NzMessageService } from 'ng-zorro-antd';
import { WarehouseManService , List, Detail} from '../../../serves/warehouseMan/warehouse-man.service';

@Component({
  selector: 'app-stock-tree',
  templateUrl: './stock-tree.component.html',
  styleUrls: ['./stock-tree.component.scss']
})
export class StockTreeComponent implements OnInit {

  constructor(private stockTree: WarehouseManService,
    private msg: NzMessageService) { }

  @Input()
  stockName: string = '';


  @Output()
  public hanldeStockChange: EventEmitter<any> = new EventEmitter()
 
  public pageNo: number;

  warehouseList:List[] = [];
  
  public total: number;
 
  public radioValue: string = ''; 
  
  ngOnInit() {
    this.searchWarehouse();
  }

  // 搜索仓库名称
  searchWarehouse() {
    const wareReq = {
      pageNo: this.pageNo,
      wmWarehouseName: this.stockName
    }
    this.stockTree.getWarehouseMan(wareReq).subscribe(
      (res) => {
        const { data, msg, status } = res
        if (status === 200) {
          this.warehouseList = data.wmWarehouseList;
          this.total = data.total;
        } else {
          this.msg.error(msg)
        }
      },
      () => {
        this.msg.error("网络错误,请稍后重试")
      }
    )
  }

  radioChange(e){
    this.hanldeStockChange.emit(e);
  }

  pageChange(pageNo){
    this.pageNo = pageNo;
    this.searchWarehouse();
  }
}

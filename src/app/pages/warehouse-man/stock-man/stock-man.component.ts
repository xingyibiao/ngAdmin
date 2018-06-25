import { Component, OnInit } from '@angular/core';
import { StockManService, StockListResult, Detail } from '../../../serves/stockMan/stock-man.service'
import { NzMessageService } from 'ng-zorro-antd'
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as addDays from 'date-fns/add_days';
import * as getISOWeek from 'date-fns/get_iso_week';
@Component({
  selector: 'app-stock-man',
  templateUrl: './stock-man.component.html',
  styleUrls: ['./stock-man.component.scss']
})
export class StockManComponent implements OnInit {

  constructor(private stockMan: StockManService,
    private msg: NzMessageService,
    private fb: FormBuilder) { }

  // 显示隐藏仓库
  public isVisibleStock: boolean = false;

  public pageNo: number;

  // 存放仓库的数据
  public stockData;

  public total: number;

  // 日期结果
  public dateResult: string;

  // 货品类型Id
  public productTypeId: string = '';

  // 搜索货品列表的条件
  public stockForm: FormGroup;

  public stockManList: Detail[] = [];

  // 显示入库弹窗
  public isShowStorage: boolean;

  // 1代表入库 0 代表出库
  public flag: number = 1

  // 存储子组件传过来的保存参数
  storageReq: any;

  ngOnInit() {
    this.stockForm = this.fb.group({
      productCode: [''],
      warehouseName: [''],
      productTypeId: [''],
      timeRange: [''],
      time: [''],
    })
    this.search();
  }
  // 获取仓库的数据
  stockChange(e) {
    this.stockData = e;
  }
  // 页面改变
  pageChange(pageNo: number) {
    this.pageNo = pageNo;
    this.search();
  }
  // 日期改变
  handleDateChange(result: Date[]) {
    if (result) {
      let startDate = result[0]
      let endDate = result[1];
      this.dateResult = this.dataformat(startDate) + "~" + this.dataformat(endDate);
    }
     // console.log(this.dateResult);
  }
  // 格式化日期
  dataformat(data: Date): string {
    let year = data.getFullYear();
    let month = data.getMonth() + 1;
    let day = data.getDate();
    return year + "-" + month + "-" + day
  }
  // 得到货品类型id
  checkedChange(e) {
    this.productTypeId = e;
  }
  // 入库操作
  storage() {
    this.isShowStorage = true;
    this.flag = 1;
    //  this.updateEditCache();
  }
  // 出库操作
  outBound() {
    this.isShowStorage = true;
    this.flag = 0;
  }
  // 确定选中的仓库
  saveStockName() {
    this.stockForm.patchValue({
      warehouseName: this.stockData.warehouseName
    })
    this.isVisibleStock = false;
  }

  search() {
  //  debugger
  //  console.log(this.dateResult);
    this.stockForm.patchValue({
      productTypeId: this.productTypeId,
      timeRange: this.dateResult
    })
    this.stockMan.getStockMan(this.stockForm.value).subscribe(
      (res) => {
        const { data, status, msg } = res;
        if (status === 200) {
          this.stockManList = data.wmProductList;
          // console.log(this.stockManList);
          this.total = data.total;
        } else {
          this.msg.error(msg)
        }
      }
    )
  }
  // 取消存货信息
  handleStorageInfo() {
    this.isShowStorage = false;
  }
  // 保存存货信息
  handleStorage(e) {
    this.storageReq = e;
    if (this.flag) {
      this.stockMan.saveStorage(this.storageReq).subscribe(
        (res) => {
          const { status, msg, data } = res;
          if (status === 200) {
            this.msg.success("入库成功");
            this.isShowStorage = false;
          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error("网络错误,请稍后重试")
        }
      )
    } else {
      this.stockMan.saveOutBound(this.storageReq).subscribe(
        (res) => {
          const { status, msg, data } = res;
          if (status === 200) {
            this.msg.success("出库成功");
            this.isShowStorage = false;
          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error("网络错误,请稍后重试")
        }
      )
    }
  }
}
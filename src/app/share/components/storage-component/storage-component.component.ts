import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StockManService, StockListResult, Detail } from '../../../serves/stockMan/stock-man.service'
import { NzMessageService } from 'ng-zorro-antd'
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as addDays from 'date-fns/add_days';
import * as getISOWeek from 'date-fns/get_iso_week';
@Component({
  selector: 'app-storage-component',
  templateUrl: './storage-component.component.html',
  styleUrls: ['./storage-component.component.scss']
})
export class StorageComponentComponent implements OnInit {

  constructor(private stockMan: StockManService,
    private msg: NzMessageService,
    private fb: FormBuilder) { }
  @Input()
  flag: number = 1;

  @Output()
  handleStorage: EventEmitter<any> = new EventEmitter()

  @Output()
  handleStorageInfo: EventEmitter<boolean> = new EventEmitter() // 关闭存货信息的弹窗

  // 显示隐藏仓库
  public isVisibleStocks: boolean = false

  public isVisibleOutStock: boolean = false

  // 搜索货品列表的条件
  public stockForm: FormGroup;

  // 入库
  public storageForm: FormGroup;

  // 添加新货品
  public addProductForm: FormGroup;

  // 出库
  public outBoundForm: FormGroup;

  // 存放仓库的数据
  public stockData;

  // 入库时间
  public storageResult: string;

  // 添加已有货品
  public isShowAddPro: boolean;

  // 添加新货品
  public isShowAddNewsPro: boolean;

  // 数据筛选
  public productName: string = '';

  //添加商品的value值
  public productValue: string = '';

  // 入库类型
  public type: number;

  // 已有货品的id
  public productId: number;

  // 暂存表单信息
  stockManInfoList = []

  // 编辑时临时用的对象
  editCache = {};

  // 货品id
  public productTypeIds: string = '';

  public total: number = 1;

  public pageNo: number = 1;

  stockManList: Detail[] = [];

  // 入库填写信息的类型
  listStorageType = [
    {
      value: 0,
      name: "进货入库"
    },
    {
      value: 1,
      name: "生产入库"
    },
    {
      value: 2,
      name: "退货入库"
    },
    {
      value: 3,
      name: "调拨入库"
    },
    {
      value: 4,
      name: "其他入库"
    }
  ]
  listOutBoundType = [
    {
      value: 5,
      name: "销售出库"
    },
    {
      value: 6,
      name: "成产出库"
    },
    {
      value: 7,
      name: "退货出库"
    },
    {
      value: 8,
      name: "调拨出库"
    },
    {
      value: 9,
      name: "其他出库"
    }
  ]
  ngOnInit() {
    this.stockForm = this.fb.group({
      productCode: [''],
      productName: [''],
      warehouseName: [''],
      productTypeId: [''],
      flag: [''],
      timeRange: ['']
    })
    this.storageForm = this.fb.group({
      inventoryCode: [''],
      supplierName: ['', Validators.required],
      warehouseId: ['', Validators.required],
      warehouseName: ['', Validators.required],
      type: ['', Validators.required],
      time: ['', Validators.required],
      storageTime: ['', Validators.required],
      storageAmount: ['', Validators.required],
      operator: ['', Validators.required],
      orderNumber: ['', Validators.required],
      remark: ['']
    })
    this.outBoundForm = this.fb.group({
      inventoryCode: [''],
      customer: ['', Validators.required],
      warehouseId: ['', Validators.required],
      warehouseName: ['', Validators.required],
      type: ['', Validators.required],
      time: ['', Validators.required],
      outageTime: ['', Validators.required],
      outageAmount: ['', Validators.required],
      operator: ['', Validators.required],
      orderNumber: ['', Validators.required],
      remark: ['']
    })
    this.addProductForm = this.fb.group({
      productCode: ['', Validators.required],
      productName: ['', Validators.required],
      productSpec: ['', Validators.required],
      productTypeId: ['', Validators.required],
      unit: ['', Validators.required],
      unitPrice: ['', Validators.required],
      stock: ['', Validators.required]
    })
  }
  // 获取仓库的数据
  stockChange(e) {
    this.stockData = e;
  }

  // 格式化日期
  dataformat(data: Date): string {
    let year = data.getFullYear()
    let month = data.getMonth() + 1
    let day = data.getDate()
    return year + "-" + month + "-" + day
  }

  // 入库时间改变
  handleStorageDateChange(result: Date) {
    // debugger
    let hour = result.getHours();
    let minutes = result.getMinutes();
    let seconds = result.getSeconds();
    this.storageResult = this.dataformat(result) + " " + hour + ":" + minutes + ":" + seconds;
  }

  // 得到货品类型id
  checkedChanges(e) {
    this.productTypeIds = e;
  }
  // 确定选中的仓库
  saveStockNames() {
    this.storageForm.patchValue({
      warehouseName: this.stockData.warehouseName
    })
    this.isVisibleStocks = false;
  }

  saveOutStockNames() {
    this.outBoundForm.patchValue({
      warehouseName: this.stockData.warehouseName
    })
    this.isVisibleStocks = false;
  }

  // 添加商品选择仓库
  saveOutStockName() {
    this.stockForm.patchValue({
      warehouseName: this.stockData.warehouseName
    })
    this.isVisibleOutStock = false;
  }

  // 入库选择类型发生改变
  handleStorageType(type: number) {
    this.type = type;
  }
  // 出库类型发生改变
  handleOutBoundType(type: number) {
    this.type = type;
  }
  // 选中已有货品时发生的改变
  handleProduct(e) {
    this.productId = e;
  }
  // 显示添加已有货品的弹窗
  showAddPro() {
    this.isShowAddPro = true;
    this.search();
  }
  search() {
    this.stockForm.patchValue({
      flag: 1
    })
    this.stockMan.getStockMan(this.stockForm.value).subscribe(
      (res) => {
        const { data, status, msg } = res;
        if (status === 200) {
          this.stockManList = data.wmProductList;
          this.total = data.total;
        } else {
          this.msg.error(msg)
        }
      }
    )
  }
  // 页面改变
  pageChange(pageNo: number) {
    this.pageNo = pageNo;
    this.search();
  }

  // 保存添加商品
  saveAddPro() {
    this.stockManList.forEach((item) => {
      if (item.id === this.productId) {
        this.stockManInfoList.push(item);
        this.stockManInfoList = Array.from(new Set(this.stockManInfoList)); //去重
      }
    })
    this.isShowAddPro = false;
    this.updateEditCache();
  }

  // 保存添加新商品
  saveAddNewsPro() {
    this.addProductForm.patchValue({
      productTypeId: this.productTypeIds
    })
    this.stockMan.getNewsProduct(this.addProductForm.value).subscribe(
      (res) => {
        const { data, status, msg } = res;
        if (status === 200) {
          this.stockManInfoList.push(data);
          this.stockManInfoList = Array.from(new Set(this.stockManInfoList)); //去重
          this.updateEditCache();
          this.msg.success("添加成功");
          this.isShowAddNewsPro = false;
        } else {
          this.msg.error(msg)
        }
      }
    )
  }
  // 删除入库信息
  delStorage(id: number) {
    this.stockManInfoList = this.stockManInfoList.filter(d => d.id !== id)
  }
  // 开始编辑
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }
  // 取消编辑
  cancelEdit(id: string): void {
    this.editCache[id].edit = false;
  }
  // 保存编辑
  saveEdit(id: string): void {
    const index = this.stockManInfoList.findIndex(item => item.id === id);
    this.stockManInfoList[index] = this.editCache[id].data;
    this.editCache[id].edit = false;
  }
  // 初始化
  updateEditCache(): void {
    if (this.stockManInfoList) {
      this.stockManInfoList.forEach(item => {
        if (!this.editCache[item.id]) {
          this.editCache[item.id] = {
            edit: false,
            dataSoruce: item
          };
        }
      });
    }
  }

  // 保存存货信息
  saveStorageInfo() {
    // console.log(this.stockData);
    let storageInfoReq;

    if (this.stockData) { // 仓库发生改变
      this.storageForm.patchValue({
        type: this.type,
        storageTime: this.storageResult,
        warehouseId: this.stockData.id
      })
      this.outBoundForm.patchValue({
        type: this.type,
        outageTime: this.storageResult,
        warehouseId: this.stockData.id
      })
    }

    if (this.flag && this.storageForm.valid) {
      storageInfoReq = this.storageForm.value // 入库信息
      storageInfoReq['data'] = JSON.stringify({ 'products': this.stockManInfoList })
      this.handleStorage.emit(storageInfoReq);

    } else if (this.outBoundForm.valid && this.flag == 0) {
      storageInfoReq = this.outBoundForm.value // 出库信息
      storageInfoReq['data'] = JSON.stringify({ 'products': this.stockManInfoList })
      this.handleStorage.emit(storageInfoReq);
    } else {
      this.msg.error("请输入必填信息");
    }
  }
  // 取消保存
  cancelStorageInfo() {
    this.handleStorageInfo.emit();
  }
}


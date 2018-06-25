import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { WarehouseManService, WarehouseResult, List, Detail } from '../../serves/warehouseMan/warehouse-man.service'
@Component({
  selector: 'app-warehouse-man',
  templateUrl: './warehouse-man.component.html',
  styleUrls: ['./warehouse-man.component.scss']
})
export class WarehouseManComponent implements OnInit {

  constructor(private whm: WarehouseManService,
    private msg: NzMessageService,
    private modal: NzModalService,
    private fb: FormBuilder) { }

  public warehouseName: string = '';

  public pageNo: number = 1;

  public total: number = 1;

  public isVisibleMiddle: boolean = false;

  public validateForm: FormGroup;

  public warehostLocationCode: string = '';

  public small: string = '';

  public checkbox = {
    checked: true
  }

  warehoustDetailList: Detail = {
    warehouseName: '',
    personCharge: '',
    personTel: '',
    warehostLocation: '',
    warehostLocationCode: '',
    warehouseAdress: '',
    warehouseCapacity: '',
    warehouseDefault: ''
  }
  warehouseList: List[] = []

  ngOnInit() {
    this.search();
    this.validateForm = this.fb.group({
      id: [''],
      flag: [''],
      warehouseName: [null, [Validators.required]],
      personCharge: [null, [Validators.required]],
      personTel: [null, [Validators.required]],
      warehostLocation: [null,[Validators.required]],
      warehostLocationCode: [null, [Validators.required]],
      warehouseAdress: [null, [Validators.required]],
      warehouseCapacity: [null, [Validators.required]],
      warehouseDefault: [0]
    });
  }
  search() {
    const wareReq = {
      pageNo: this.pageNo,
      wmWarehouseName: this.warehouseName
    }
    this.whm.getWarehouseMan(wareReq).subscribe(
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
  pageChange(pageNo: number) {
    this.pageNo = pageNo;
    this.search();
  }

  handleCancelMiddle() {
    this.isVisibleMiddle = false;
  }

  private pcaData

  pcaChange(e) {
    this.pcaData = e
    // console.log(this.pcaData);
  }

  // 新增和编辑
  editWarehouse(id: number = 0) {
    this.isVisibleMiddle = true;
    //编辑
    if (id) {
      this.whm.getWarehouseManDetail(id).subscribe(
        (res) => {
          const { data, msg, status } = res
          if (status === 200) {
            this.warehoustDetailList = data;
            this.validateForm.setValue({
              id: id,
              flag: 1,
              warehouseName: this.warehoustDetailList.warehouseName,
              personCharge: this.warehoustDetailList.personCharge,
              personTel: this.warehoustDetailList.personTel,
              warehostLocation: this.warehoustDetailList.warehostLocation,
              warehostLocationCode: this.warehoustDetailList.warehostLocationCode,
              warehouseAdress: this.warehoustDetailList.warehouseAdress,
              warehouseCapacity: this.warehoustDetailList.warehouseCapacity,
              warehouseDefault: this.warehoustDetailList.warehouseDefault ? 1 : 0
            })

          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error("网络错误,请稍后重试")
        }
      )
    } else {
      this.validateForm.setValue({
        id: '',
        flag: 0,
        warehouseName: '',
        personCharge: '',
        personTel: '',
        warehostLocation: '',
        warehostLocationCode: '',
        warehouseAdress: '',
        warehouseCapacity: '',
        warehouseDefault: ''
      })
    }
  }
  // 保存
  handleOkMiddle(id: number = 0) {
    this.validateForm.patchValue({
      warehostLocation: this.pcaData.treeName,
      warehostLocationCode: this.pcaData.superCodes + "," + this.pcaData.code,
      warehouseDefault: this.checkbox ? 1 : 0
    })
    this.whm.saveWarehouseManInfo(this.validateForm.value).subscribe(
      (res) => {
        const { status, data, msg } = res;
        if (status === 200) {
          this.isVisibleMiddle = false;
          this.msg.success("保存成功");
          this.search()
        } else {
          this.msg.error(msg)
        }
      },
      () => {
        this.msg.error("网络错误,请稍后重试")
      }
    )
  }
  // 删除
  delWarehouse(id: number) {
    this.modal.confirm({
      nzTitle: '确定要删除吗?',
      nzContent: '删除后无法恢复',
      nzOnOk: () => {
        this.whm.delWarehouseMan(id).subscribe(
          (res) => {
            const { data, msg, status } = res
            if (status === 200) {
              this.msg.success("删除成功")
              this.search();
            } else {
              this.msg.error(msg)
            }
          },
          () => {
            this.msg.error("网络错误,请稍后重试")
          }
        )
      },
      nzOnCancel: () => {
        this.msg.error("你已取消该操作")
      }
    })
  }
}

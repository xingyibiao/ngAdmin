import { Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { PcaService } from '../../../serves/pca/pca.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-pca',
  templateUrl: './pca.component.html',
  styleUrls: ['./pca.component.scss']
})
export class PcaComponent implements OnInit, OnChanges {

  constructor(private shq: PcaService,
    private msg: NzMessageService) { }


  @Input()
  pca: string = ''

  @Input()
  size: string = 'size'

  @Output()
  public handleChange: EventEmitter<any> = new EventEmitter()

  public province: string
  provinces = [
    {
      id: 0,
      code: '',
      name: '全部'
    }
  ]
  public city: string
  citys = [
    {
      id: 0,
      code: '',
      name: '全部'
    }
  ]
  public area: string
  areas = [
    {
      id: 0,
      code: '',
      name: '全部'
    }
  ]

  ngOnChanges(changes: SimpleChanges) {
    if (this.pca) {
      if (this.pca.startsWith('0,')) {
        this.pca = this.pca.replace("0,", '')
      }
      this.getProvinces('', false)
    }
  }
  
  // 获得省,isSelect代表选中状态
  public getProvinces(code: string = '', isSelect: boolean = false) { 
    this.shq.getPca(code).subscribe(
      (res) => {
        const { data, status, msg } = res;
        if (status === 200) {
          this.provinces = data
          if (!this.pca || isSelect) { // 如果没有默认值或者是选中的状态,则默认显示为第一条数据,市区同理
            this.province = this.provinces[0].code
          } else {
            this.province = this.pca.split(",")[0]
          }
            this.getCity(this.province) // 获得市
        } else {
          this.msg.error(msg)
        }
      },
      () => {
        this.msg.error("网络错误,请稍后重试")
      }
    )
  }

  public getCity(code: string, isSelect: boolean = false) {
    if (this.pca && !isSelect) {
       code = this.pca.split(",")[0]
    }
    this.shq.getPca(code).subscribe(
      (res) => {
        const { data, status, msg } = res;
        if (status === 200) {
          this.citys = data
          if (isSelect || !this.pca) {
            this.city = this.citys[0].code
          } else {
            this.city = this.pca.split(",")[1]
          }
          this.getArea(this.city)
        } else {
          this.msg.error(msg)
        }
      },
      () => {
        this.msg.error("网络错误,请稍后重试")
      }
    )
  }

  public getArea(code: string, isSelect: boolean = false) {
    if (this.pca && !isSelect) {
      code = this.pca.split(",")[1]
    }
    this.shq.getPca(code).subscribe(
      (res) => {
        const { data, status, msg } = res;
        if (status === 200) {
          this.areas = data
          if (isSelect || !this.pca) {
            this.area = this.areas[0].code;
            this.handleChange.emit(this.areas[0]);
          } else {
            this.area = this.pca.split(",")[2]
            for (let i = 0; i < this.areas.length; i++) {
              if (this.area === this.areas[i].code) {
                this.handleChange.emit(this.areas[i]);
              }
            }
          }
        } else {
          this.msg.error(msg)
        }
      },
      () => {
        this.msg.error("网络错误,请稍后重试")
      }
    )
  }

  public emitPca(code: string) {
    this.shq.getPca(code).subscribe(
      (res) => {
        const { data, status, msg } = res;
        if (status === 200) {
          this.handleChange.emit(data[0])
        } else {
          this.msg.error(msg)
        }
      },
      () => {
        this.msg.error("网络错误,请稍后重试")
      }
    )
  }

  ngOnInit() {

    this.getProvinces('', false)
  }
}

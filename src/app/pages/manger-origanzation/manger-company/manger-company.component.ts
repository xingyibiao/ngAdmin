import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService, NzMessageBaseService } from 'ng-zorro-antd';
import { MangerCompanyService, CompanyReq, CompanyResult, SysCompanyes } from '../../../serves/manger-company/manger-company.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-manger-company',
  templateUrl: './manger-company.component.html',
  styleUrls: ['./manger-company.component.scss']
})
export class MangerCompanyComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private companyService: MangerCompanyService,
    private msg: NzMessageService,
    private modal: NzModalService) { }

  mangerCompanyList: SysCompanyes[] = [];

  // 子公司名称
  companyName: string = '';

  // 当前页
  public pageNo: number = 1

  // 总条数
  public total: number = 1

  public postForm: FormGroup;

  public permission: string[] = []
  public showPop: boolean = false;
  ngOnInit() {
    this.search();
    // 对表单进行验证 
    this.postForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.maxLength(20)]],
      companyCode: ['']
    })

  }

  public search() {
    const companyReq: CompanyReq = {
      childrenCompanyName: this.companyName,
      pageNo: this.pageNo
    }
    this.companyService.getCompanyList(companyReq)
      .subscribe(
      (res) => {
        const { msg, status, data } = res
        if (status === 200) {
          this.mangerCompanyList = data.sysCompanyes;
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
  pageChange(pageNo) {
    this.pageNo = pageNo;
    this.search();
  }

  // 新增或者编辑
  public addEditCompany(companyCode: string = '') {
    //this.showPop = true;
    if (companyCode) { //编辑
      this.companyService.addEditCompany(companyCode).subscribe(
        (res) => {
          const { status, msg, data } = res;
          if (status === 200) {
            const { companyName } = data;
            this.postForm.setValue({
              companyCode,
              companyName: companyName
            })
          } else {
            this.msg.error(msg)
          }
        })
    } else { //新增
      this.postForm.setValue({
        companyCode: '',
        companyName: ''
      })
    }
  }
  //删除
  public delCompany(companyCode: string) {
    this.modal.confirm({
      nzTitle: '确定删除该子公司',
      nzContent: '删除后无法恢复',
      nzOnOk: () => {
        this.companyService.deleComPany(companyCode).subscribe(
          (res) => {
            const { status, msg, data } = res;
            if (status === 200) {
              this.msg.success("删除成功");
              this.search();
            } else {
              this.msg.error(msg)
            }
          },()=>{
            this.msg.error("网络错误,请稍后重试");
          }
        )
      }
    });

  }
  // 保存
  public save() {
    if (this.postForm.valid) {
      this.companyService.saveCompanyInfo(this.postForm.value)
        .subscribe(
        (res) => {
          const { status, msg } = res
          if (status === 200) {
            this.msg.success('保存成功!')
            this.search()
          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error('网络错误，请稍后重试！')
        }
        )
    }
  }
}


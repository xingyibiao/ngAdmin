import { Component, OnInit, OnDestroy } from '@angular/core';
import { MangerDepartmentService, GetOfficeListInfo, Office, User, OfficeDept } from '../../../serves/manger-department/manger-department.service';
import { NzMessageService, NzModalService, NzTreeNode, NzFormatEmitEvent } from 'ng-zorro-antd';
import { AuthServiceService, Menu } from '../../../serves/auth-service/auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manger-department',
  templateUrl: './manger-department.component.html',
  styleUrls: ['./manger-department.component.scss']
})
export class MangerDepartmentComponent implements OnInit, OnDestroy {

  constructor(private mgDepartService: MangerDepartmentService,
    private msg: NzMessageService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private auth: AuthServiceService) { }

  // 部门名称
  public officeName: string = ''

  // 当前页
  public pageNo: number = 1

  // 总数
  public total: number = 0

  // 部门列表
  public officeList: Office[] = []

  // 选中部门
  // public selectedOffice: Office

  // 选中部门、公司key
  public checkedOffice: string[] = []

  // 选中部门、公司title
  public checkedOfficName: string = ''

  // 副主管人员
  public subLeaders: User[] = []

  permission: string[] = []

  // 编辑、新增表单
  public officeForm: FormGroup

  // 显示编辑、新增模态框
  public showEditor: boolean = false

  // 搜索部门名称
  public modelOfficeName: string = ''

  // 搜索人员名称
  public userName: string = ''
  
  // 所有人员
  public users: User[] = []


  // 所有部门
  public fullNameNodes: NzTreeNode[] = []

  // 主管人员
  public leader: User = {
    loginCode: '',
    userName: '',
    userCode: '',
  }
  

  // 所属公司、部门显示
  public showFullName: boolean = false

  // 主管人员选择框显示
  public showLeader: boolean = false

  // 副主管人员选择框显示
  public showSubLeader: boolean = false

  // 类型选择框显示
  public showType: boolean = false

  ngOnInit() {
    // 创建表单
    this.createOfficeForm()
    // 默认执行一次搜索，以展示所所有部门
    this.search()
    // 获得组织架构
    // this.getCompanyDepart()
    // 获取所有人员
    // this.getUsers()
  }

  // 创建编辑、新增表单
  public createOfficeForm() {
    this.officeForm = this.fb.group({
      officeCode: [''],
      officeName: ['', Validators.required],
      fullName: ['', Validators.required],
      officeType: ['', Validators.required],
      officeTypeName: ['', Validators.required],
      parentCode: [''],
      leader: [''],
      subLeader: [''],
      leaderCode: [''],
      subLeaderCode: ['']
    })
  }

  // 搜索
  public search() {
    const info: GetOfficeListInfo = {
      pageNo: this.pageNo,
      officeName: this.officeName
    }
    this.mgDepartService.getOfficeList(info)
      .subscribe(
        (res) => {
          const { status, msg, data } = res
          if (status === 200) {
            const { result, total } = data
            this.total = total
            this.officeList = result
          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error('网络错误，请稍后重试！')
        }
      )
  }

  // 获得组织架构
  public getCompanyDepart() {
    this.mgDepartService.getCompanyDepart(this.modelOfficeName)
      .subscribe(
        (res) => {
          const { status, msg, data } = res

          function format(tree: any[]) {
            tree.forEach((tr) => {
              if (tr.children.length > 0) {
                format(tr.children)
              } else {
                tr.isLeaf = true
              }
            })
          }

          if (status === 200) {
            // console.log(data)
            const treeDataStr = JSON.stringify(data).replace(/officeName/g, 'title')
              .replace(/officeCode/g, 'key')
              .replace(/child/g, 'children')

            const treeData: NzTreeNode[] = []
            const tree = JSON.parse(treeDataStr)

            format(tree)
            
            tree.forEach((tr) => {
              treeData.push(new NzTreeNode(tr))
            })

            this.fullNameNodes = treeData
          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error('网络错误，请稍后重试！')
        }
      )
  }

  // 获得所有人员
  public getUsers() {
    this.mgDepartService.getUsers(this.userName)
      .subscribe(
        (res) => {
          const { status, msg, data } = res
          if (status === 200) {
            const officeSubLeaderCode: string[] = this.officeForm.get('subLeaderCode').value ? this.officeForm.get('subLeaderCode').value.split(',') : []
            // 人员列表选中
            if (officeSubLeaderCode.length > 0) {
              officeSubLeaderCode.forEach((codes) => {
                data.forEach((d) => {
                  if (codes === d.userCode) {
                    d.checked = true
                  }
                })
              })
            }
            this.users = data
            
          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error('网络错误，请稍后重试！')
        }
      )
  }

  // 页码改变
  public pageChange(pageNo: number) {
    this.pageNo = pageNo
    this.search()
  }


  // 点击编辑、新增
  public selectDepart(officeCode: string) {
    this.showEditor = true 
    if (officeCode) { // 编辑
      let officeTypeName = ''
      this.mgDepartService.getOfficeByCode(officeCode)
        .subscribe(
          (res) => {
            const { status, msg, data} = res
            if (status === 200) {
              switch (data.officeType) {
                case '1':
                  officeTypeName = '公司'
                  break;
                case '2':
                  officeTypeName = '子公司'
                  break;
                case '3':
                  officeTypeName = '部门'
                  break;
              }
              this.officeForm.setValue({
                officeCode: data.officeCode,
                officeName: data.officeName,
                fullName: data.fullName,
                parentCode: data.parentCode,
                officeType: data.officeType,
                officeTypeName: officeTypeName,
                leader: data.leader,
                leaderCode: data.leaderCode,
                subLeader: data.subLeader,
                subLeaderCode: data.subLeaderCode
              })

              this.fullNameNodes.map((fu) => fu.clearChildren())
              // 获得组织架构
              this.getCompanyDepart()
              // 获得所有人员
              this.getUsers()
              this.checkedOffice = [data.parentCode]
              this.checkedOfficName = data.extendS4
            } else {
              this.msg.error(msg)
            }
          },
          () => {
            this.msg.error('网络错误，请稍后重试！')
          }
        )
      
    } else {
      this.officeForm.reset()
      // 获得组织架构
      this.getCompanyDepart()
      // 获得所有人员
      this.getUsers()
    }
  }

  // 保存编辑
  public save() {
    if (this.officeForm.valid) {
      this.showEditor = false
      this.mgDepartService.saveOffice(this.officeForm.value)
        .subscribe(
          (res) => {
            const { status, msg } = res
            if (status === 200) {
              this.msg.success('保存成功！')
              // 保存成功，刷新列表
              this.search()
            } else {
              this.msg.error(msg)
            }
          },
          () => {
            this.msg.error('网络错误，请稍后重试！')
          }
        )
    } else {
      this.msg.error('请确保填写完整性')
    }
  }

  // 取消编辑
  public cancel() {
    this.showEditor = false
  }

  // 部门公司checkBox改变
  public treeChange(e: NzFormatEmitEvent) {
    // console.log(e.node)
    if (e.node.isChecked) { // 点击选中
      const { key, title } = e.node
      this.checkedOffice = [key]
      this.checkedOfficName = title
    } else { // 点击取消
      this.checkedOffice = []
    }
  }

  // 选中公司、部门
  public saveFullName() {
    this.showFullName = false
  }

  // 选中主管人员
  public saveLeader() {
    const leaderCode = this.officeForm.get('leaderCode').value
    const user = this.users.filter((user) => {
      return user.userCode === leaderCode
    })
    this.officeForm.patchValue({
      leader: user.length > 0 ? user[0].userName : ''
    })

    this.showLeader = false
  }

  // 副主管人员改变
  public subLeaderChange(val: string[]): void {
    // console.log(val)
    const users: User[] = []
    val.forEach((v) => {
      this.users.forEach((user) => {
        if (user.userCode === v) {
          users.push(user)
        }
      })
    })
    this.subLeaders = users
  }

  // 选中副主管人员
  public saveSubLeader() {
    const subLeaderArr: string[] = []
    const subLeaderCodeArr: string[] = []
    this.subLeaders.forEach((sub) => {
      subLeaderArr.push(sub.userName)
      subLeaderCodeArr.push(sub.userCode)
    })
    this.officeForm.patchValue({
      subLeader: subLeaderArr.join(','),
      subLeaderCode: subLeaderCodeArr.join(',')
    })

    this.showSubLeader = false
  }

  // 选中类型
  public saveOfficeType() {
    const officeType = +this.officeForm.get('officeType').value
    const officeTypeName = officeTypeEnum[officeType - 1]
    this.officeForm.patchValue({
      officeTypeName
    })

    this.showType = false
  }

  // 删除部门
  public delDepart(officeCode: string) {
    this.modal.confirm({
      nzTitle: '确定删除该岗位？',
      nzContent: '删除后将无法恢复',
      nzOnOk: () => {
        this.mgDepartService.deleteOffice(officeCode)
          .subscribe(
            (res) => {
              const { status, msg } = res
              if (status === 200) {
                this.msg.success('删除成功')
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
    })
  }

  // 点击totip取消
  public cancelTotip(type: string) {
    this[type] = false
  }

  ngOnDestroy() {
    // 关闭所有弹窗
    this.showEditor = false
    this.showFullName = false
    this.showLeader = false
    this.showSubLeader = false
    this.showType = false
  }

}

export enum officeTypeEnum {
  '公司',
  '子公司',
  '部门'
}



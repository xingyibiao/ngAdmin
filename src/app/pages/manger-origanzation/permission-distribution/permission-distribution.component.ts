import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService, NzMessageBaseService, NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';
import { PermissionDistributionService, EmployReq, EmployResult, UserRoleReq } from '../../../serves/permission-distribution/permission-distribution.service'
@Component({
  selector: 'app-permission-distribution',
  templateUrl: './permission-distribution.component.html',
  styleUrls: ['./permission-distribution.component.scss']
})
export class PermissionDistributionComponent implements OnInit {
  @ViewChild('nzTree') nzTree: NzTreeComponent;
  constructor(private fb: FormBuilder,
    private permissDis: PermissionDistributionService,
    private msg: NzMessageService,
    private modal: NzModalService) { }

  public employeesName: string = '';
  public status: string = '';

  // 人员信息列表
  permissionList = [];

  officeName: string = '';

  // 组织架构列表
  enterPiseList = [];

  // 选中的值
  officeCode = [];

  // 角色列表
  roleList = [];

  statusList = {
    0: '在职',
    1: '删除',
    2: '离职',
    3: '冻结'
  }

  // 选中的角色
  checkedRole = [];

  // 用户角色
  checkedUserCode = []

  pageNo: string = '';
  total: string = '';

  // 全选
  allChecked: boolean = false;
  indeterminate: boolean = true;

  checkOptionsOne = [];

  public search() {
    const employReq: EmployReq = {
      officeCode: this.officeCode.join(','),
      userName: this.employeesName,
      loginCode: '',
      status: this.status,
      pageNo: this.pageNo
    }
    this.permissDis.getEmployeeList(employReq).subscribe(
      (res) => {
        const { status, msg, data } = res;
        if (status === 200) {
          this.permissionList = data.result;
          this.pageNo = data.pageNo;
          this.total = data.total;
        }
      }
    )
  }

  // 得到组织架构
  public getEnterpise() {
    this.permissDis.getEnterpiseList(this.officeName).subscribe(
      (res) => {
        const { status, msg, data } = res;
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
          const str = JSON.stringify(data) // 转化成字符串
          const nodeListStr = str.replace(/officeName/g, 'title').replace(/officeCode/g, 'key')
            .replace(/child/g, 'children')
          const treeData: NzTreeNode[] = []
          const tree = JSON.parse(nodeListStr) // 转换成JSON对象
          tree.forEach((tr) => {
            treeData.push(new NzTreeNode(tr))
          })
          this.enterPiseList = treeData;
        } else {
          this.msg.error(msg);
        }
      }, () => {
        this.msg.error("网络错误,请稍后重试")
      }
    )
  }

  // 获取被选中的节点
  mouseAction(name: string, event: NzFormatEmitEvent): void {
    this.officeCode = [];
    this.nzTree.nzTreeService.getCheckedNodeList().forEach((el) => {
      this.officeCode.push(el.key);
    })
    this.search();
  }

  // 得到角色列表
  getRoleList(userCode: string = '') {
    this.permissDis.getRoleList(userCode).subscribe(
      (res) => {
        const { status, msg, data } = res;
        if (status === 200) {
          data.forEach((d) => {
            d.check = (d.check === '0' ? false : true)
          })
          this.roleList = data;
          //console.log(this.roleList)
        } else {
          this.msg.error(msg);
        }
      },
      () => {
        this.msg.error("网络错误,请稍后重试")
      }
    )
  }
  // 全选
  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkedUserCode = [];
      this.checkOptionsOne.forEach((item) => { item.checked = true;});
      this.permissionList.forEach(item => { this.checkedUserCode.push(item.userCode)})
    } else {
      this.checkOptionsOne.forEach(item => item.checked = false);
    }
  }

  // 获取单个选择的值
  handleMulChoose(value: string[]): void {
    this.checkedUserCode = [];
    if (this.checkOptionsOne.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
    this.checkedUserCode.push(value);
  }

  // 获取选中的角色
  handelCheckbox(value: string[]): void {
    this.checkedRole = value;
  }

  // 人员与角色绑定多对多
  saveUserRole() {
    const userRole: UserRoleReq = {
      userCode: this.checkedUserCode.join(','),
      roleCode: this.checkedRole.join(',')
    }
    this.permissDis.saveUserRole(userRole).subscribe(
      (res) => {
        const { status, msg, data } = res;
        if (status === 200) {
          this.msg.success(msg)
        } else {
          this.msg.error(msg);
        }
      },
      () => {
        this.msg.error("网络错误,请稍后重试")
      }
    )
  }
  // 人员与角色绑定一对多
  saveSingleUserRole(userCode: string = '') {
    const userRole: UserRoleReq = {
      userCode: userCode,
      roleCode: this.checkedRole.join(',')
    }
    this.permissDis.saveSingleUserRole(userRole).subscribe(
      (res) => {
        const { status, msg, data } = res;
        if (status === 200) {
          this.msg.success(msg)
        } else {
          this.msg.error(msg);
        }
      },
      () => {
        this.msg.error("网络错误,请稍后重试")
      }
    )
  }
  // 页面改变
  pageChange(pageNo) {
    this.pageNo = pageNo;
    this.search();
  }

  ngOnInit() {
    this.getEnterpise();
    this.search();
  }
}

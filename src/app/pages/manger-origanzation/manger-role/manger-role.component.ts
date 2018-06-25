import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService, NzMessageBaseService, NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';
import { MangerRoleService, roleReq, roleResult, detailResult, RoleMenu, Child, SaveMenuInfo } from '../../../serves/manger-role/manger-role.service'



@Component({
  selector: 'app-manger-role',
  templateUrl: './manger-role.component.html',
  styleUrls: ['./manger-role.component.scss']
})
export class MangerRoleComponent implements OnInit {
  @ViewChild('nzTree') nzTree: NzTreeComponent;
  constructor(private fb: FormBuilder,
    private roleService: MangerRoleService,
    private msg: NzMessageService,
    private modal: NzModalService) { }

  public roleName: string = ''

  // 存放获得的角色列表
  mangerRoleList: detailResult[] = [];

  // 功能菜单列表
  menuRoleList = [];

  // 当前页
  public pageNo: number = 1

  // 总条数
  public total: number = 1

  public postForm: FormGroup;

  //存放被选中的节点
  checkboxList = [];

  ngOnInit() {
    this.search();
    // 对表单进行验证
    this.postForm = this.fb.group({
      roleName: ['', Validators.required],
      roleCode: ['']
    })
  }
  // 保存 
  public save() {
    if (this.postForm.valid) {
      this.roleService.saveRole(this.postForm.value)
        .subscribe(
        (res) => {
          const { status, msg, data } = res;
          if (status === 200) {
            this.msg.success("保存成功");
            this.search();
          } else {
            this.msg.error(msg);
          }
        },
        () => {
          this.msg.error("网络错误,请稍后重试")
        }
        )
    }

  }
  // 编辑和新增角色
  public addEditRole(roleCode: string = '') {
    if (roleCode) { //编辑
      this.roleService.addEditRole(roleCode).subscribe(
        (res) => {
          const { status, msg, data } = res;
          if (status === 200) {
            const { roleName } = data;
            this.postForm.setValue({
              roleName: roleName,
              roleCode
            })
          }
        }
      )
    } else {
      this.postForm.setValue({
        roleName: '',
        roleCode: ''
      })
    }
  }
  // 删除角色
  public delRole(roleCode: string) {
    this.modal.confirm({
      nzTitle: '确定删除该子公司',
      nzContent: '删除后无法恢复',
      nzOnOk: () => {
        this.roleService.deleRole(roleCode).subscribe(
          (res) => {
            const { status, msg, data } = res;
            if (status === 200) {
              this.msg.success("删除成功");
              this.search();
            } else {
              this.msg.error(msg)
            }
          }, () => {
            this.msg.error("网络错误,请稍后重试")
          }
        )
      }
    })
  }
  // 查询
  public search() {
    const rolereq: roleReq = {
      pageNo: this.pageNo,
      roleName_like: this.roleName,
      roleCode_like: '',
      userType: '',
      isSys: '',
      status: ''
    }
    this.roleService.getRoleList(rolereq)
      .subscribe(
      (res) => {
        const { status, msg, data } = res;
        if (status === 200) {
          this.mangerRoleList = data.result;
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
  // 页面改变
  pageChange(pageNo) {
    this.pageNo = pageNo;
    this.search();
  }
  // 点击编辑获取功能列表
  getRoleMenu(roleCode: string) {
    this.roleService.getRoleMenu(roleCode)
      .subscribe(
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
          let str = JSON.stringify(data)
          let nodeListStr = str.replace(/menuName/g, 'title').replace(/child/g, 'children').replace(/menuCode/g, 'key');
          let nodeListOb = JSON.parse(nodeListStr)
          format(nodeListOb)
          this.menuRoleList = [];
          nodeListOb.forEach(element => {
            this.menuRoleList.push(new NzTreeNode(element));
          });
        } else {
          this.msg.error(msg)
        }
      },
      () => {
        this.msg.error("网络错误,请稍后重试")
      }
      )
  }
  //获取被选中的节点
  mouseAction(name: string, event: NzFormatEmitEvent): void {
    let checkboxList = [];
    // this.nzTree.nzTreeService.getCheckedNodeList().forEach((el) =>{
    //    checkboxList.push(el.key);
    // })
    function attain(tree: NzTreeNode[]) {
      tree.forEach((tr) => {
        checkboxList.push(tr.key)
        if (tr.children.length >0) {
          attain(tr.children)
        } else {
          if(checkboxList.indexOf(tr.parentNode.key)==-1){
            checkboxList.push(tr.parentNode.key)
          }
        }
      })
    }
    attain(this.nzTree.nzTreeService.getCheckedNodeList());
    this.checkboxList = checkboxList;
    //console.log(this.checkboxList);
    
  }

  

  // 保存功能列表
  saveRoleMenu(roleCode: string) {
    this.checkboxList=[];// 清空
    const roleMenuReq: SaveMenuInfo = {
      roleCode: roleCode,
      roleMenuListJson: this.checkboxList.join(',')
    }
    if (roleMenuReq.roleMenuListJson != '') {
      this.roleService.saveRoleMenu(roleMenuReq)
        .subscribe(
        (res) => {
          const { status, msg, data } = res;
          if (status === 200) {
            this.msg.success("保存成功")
          } else {
            this.msg.error(msg);
          }
        },
        () => {
          this.msg.error("网络错误,请稍后重试");
        }
        )
    } else {
      this.msg.error("请选择一个");
    }
  }
}

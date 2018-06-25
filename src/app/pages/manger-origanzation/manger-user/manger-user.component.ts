import { Component, OnInit, ViewChild } from '@angular/core';
import { MangerUserService, GetUserInfo, User } from '../../../serves/manger-user/manger-user.service';
import { NzMessageService, NzModalService, NzTreeNode } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../../serves/manger-post/manger-post.service';

@Component({
  selector: 'app-manger-user',
  templateUrl: './manger-user.component.html',
  styleUrls: ['./manger-user.component.scss']
})
export class MangerUserComponent implements OnInit {

  constructor(private userServer: MangerUserService,
    private msg: NzMessageService,
    private modal: NzModalService,
    private fb: FormBuilder) { 

    this.creatForm()
  }

  @ViewChild('officeTree')
  officeTree

  // 人员姓名或账号
  public nameorlogin: string = ''

  // 人员状态 0 -> 正常 2 -> 离职 3 -> 冻结
  public status: number = 0

  // 当前页
  public pageNo: number = 1

  // 总数
  public total: number = 0

  // 人员列表
  public users: User[] = []

  // 显示编辑、新增模态框
  public showEditor: boolean = false

  // 员工新增、编辑表单
  public userForm: FormGroup

  // 显示岗位设置totip
  public showPost: boolean = false

  // 显示组织架构totip
  public showOffices: boolean = false

  // 搜索岗位名称
  public postName: string = ''

  public cachePostName: string = ''
  
  // 选中的岗位
  private checedPosts: Post[] = []
  
  // 搜索组织架构名称
  public modelOfficeName: string = ''
  
  public cacheOfficeName: string = ''
  
  ngOnInit() {
  }

  // 创建表单控件
  public creatForm() {
    this.userForm = this.fb.group({
      usercode: [''],
      logincode: ['', Validators.required],
      syspostcode: ['', Validators.required],
      postname: ['', Validators.required],
      status: ['', Validators.required],
      officecode: ['', Validators.required],
      officename: ['', Validators.required],
      username: ['', Validators.required]
    })
  }


  // 主页面点击搜索
  public search() {
    const info: GetUserInfo = {
      pageNo: this.pageNo,
      nameorlogin: this.nameorlogin,
      status: this.status
    }
    this.userServer.getUsers(info)
      .subscribe(
        (res) => {
          const { status, msg, data } = res
          if (status === 200) {
            // console.log(data)
            const { total, list } = data
            this.users = list
            this.total = total
          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error('网络错误，请稍后再试！')
        }
      )
  }

  // 删除
  public delUser(userCode: string) {
    this.modal.confirm({
      nzTitle: '确定删除该人员？',
      nzContent: '删除后将无法恢复',
      nzOnOk: () => {
        this.userServer.delUserByCode(userCode)
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

  // 页码改变
  public pageChange(pageNo: number) {
    this.pageNo = pageNo
    this.search()
  }

  // 点击编辑或新增
  public selectUser(usercode: string) {
    this.showEditor = true
    if (usercode) { // 编辑
      this.userServer.getUserByCode(usercode)
        .subscribe(
          (res) => {
            const { status, msg, data } = res
            if (status === 200) {
              const postnames: string[] = []
              const postcodes: string[] = []
              data.post.forEach((p) => {
                postnames.push(p.postname)
                postcodes.push(p.postcode)
              })
              data['syspostcode'] = postcodes
              data['postname'] = postnames.join(',')
              delete data.post
              this.userForm.setValue({
                ...data
              })

            } else {
              this.msg.error(msg)
            }
          },
          () => {
            this.msg.error('网络错误，请稍后再试！')
          }
        )
    } else { // 新增
      this.userForm.reset()
    }
  }

  // 点击保存
  public save() {
    if(this.userForm.valid) {
      const value = this.userForm.value
      
      value.syspostcode = value.syspostcode.join(',')

      this.userServer.saveUser(value)
        .subscribe(
          (res) => {
            const { status, msg } = res
            if (status === 200) {
              this.msg.success('保存成功！')
              this.showEditor = false
            } else {
              this.msg.error(msg)
            }
          },
          () => {
            this.msg.error('保存失败，请稍后重试！')
          }
        )
    } else {
      console.log(this.userForm.errors)
      this.msg.error('请填写完整信息')
    }
  }

  // 模态框点击取消
  public cancel() {
    this.showEditor = false
  }

  // 点击组织架构搜索
  public getCompanyDepart() {
    this.cacheOfficeName = this.modelOfficeName
  }

  public officeChange(e: NzTreeNode) {
    if (e) {
      this.userForm.patchValue({
        officecode: e.key,
        officename: e.title
      })
    } else {
      this.userForm.patchValue({
        officecode: '',
        officename: ''
      })
    }
  }

  // 监听岗位选择
  public postChange(posts: Post[]) {
    this.checedPosts = posts
  }

  // 点击保存设置岗位
  public savePostCode() {
    const postNames: string[] = []
    const postCodes: string[] = []

    this.checedPosts.forEach((cp) => {
      postNames.push(cp.postName)
      postCodes.push(cp.postCode)
    })

    this.userForm.patchValue({
      postname: postNames.join(','),
      syspostcode: postCodes
    })
    this.showPost = false
  }

  // 保存所属部门公司
  public saveOffice() {
    this.showOffices = false
  }

  // 点击totip取消
  public cancelTotip(type: string) {
    this[type] = false
  }

}

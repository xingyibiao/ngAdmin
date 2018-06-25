import { Component, OnInit } from '@angular/core';
import { MangerPostService, getPostListReq, Post } from '../../../serves/manger-post/manger-post.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService, Menu } from '../../../serves/auth-service/auth-service.service';

@Component({
  selector: 'app-manger-post',
  templateUrl: './manger-post.component.html',
  styleUrls: ['./manger-post.component.scss']
})
export class MangerPostComponent implements OnInit {

  constructor(private mgPostServe: MangerPostService,
    private auth: AuthServiceService,
    private msg: NzMessageService,
    private fb: FormBuilder,
    private modal: NzModalService) { }

  // 岗位名称
  public postName: string = ''

  // 是否展示停用岗位
  public isShowStop: boolean = true

  // 当前页
  public pageNo: number = 1

  // 总条数
  public totals: number = 0

  postList: Post[] = []

  // postForm
  public postForm: FormGroup

  public permission: string[] = []

  ngOnInit() {
    // 查看权限，展示页面
    this.getAuth()

    // 默认执行一次查询展示所有列表
    this.search()

    this.postForm = this.fb.group({
      postName: ['', Validators.required],
      postRemarks: ['', [Validators.required, Validators.maxLength(500)]],
      postCode: ['']
    })
  }

  // 查看页面权限
  private getAuth() {
    this.auth.menus.subscribe(
      (menus: Menu[]) => {
        menus.forEach((menu) => {
          menu.children.forEach((child) => {
            if (child.menuPinyin === 'gwgl') {
              this.permission = child.permission
            }
          })
        })
      }
    )
  }

  // 搜索
  public search() {
    const reqData: getPostListReq = {
      postName: this.postName,
      isShowStop: this.isShowStop,
      pageNo: this.pageNo
    }
    this.mgPostServe.getPostList(reqData)
      .subscribe(
        (res) => {
          const { status, msg, data } = res
          if (status === 200) {
            this.postList = data.result
            this.totals = data.total
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

  // 删除岗位
  public deletePost(postCode: string) {
    this.modal.confirm({
      nzTitle: '确定删除该岗位？',
      nzContent: '删除后将无法恢复',
      nzOnOk: () => {
        this.mgPostServe.deletPost(postCode)
          .subscribe(
            (res) => {
              const { status, msg } = res
              if (status === 200) {
                this.msg.success('删除成功！')
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

  // 选定岗位
  public selectPost(postCode: string = '') {
    if (postCode) { // 编辑
      this.mgPostServe.getPostByCode(postCode)
        .subscribe(
          (res) => {
            const { status, msg, data } = res
            if (status === 200) {
              const { postName, remarks } = data
              this.postForm.setValue({
                postCode,
                postName,
                postRemarks: remarks
              })
            } else {
              this.msg.error(msg)
            }
          },
          () => {
            this.msg.error('网络错误，请稍后重试！')
          }
        )
    } else { // 新增
      this.postForm.setValue({
        postCode,
        postName: '',
        postRemarks: ''
      })
    }
  }

  // 保存
  public save() {
    if (this.postForm.valid) {
      this.mgPostServe.savePost(this.postForm.value)
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

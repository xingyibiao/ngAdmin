import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { NzTreeNode, NzMessageService } from 'ng-zorro-antd';
import { MangerPostService, Post } from '../../../serves/manger-post/manger-post.service';

@Component({
  selector: 'app-post-tree',
  templateUrl: './post-tree.component.html',
  styleUrls: ['./post-tree.component.scss']
})
export class PostTreeComponent implements OnInit, OnChanges {

  constructor(private postServer: MangerPostService,
    private msg: NzMessageService) { }

  @Input()
  postName: string = ''

  pageNo: number = 1

  isShowStop: boolean = true

  private pages: number = 1

  // 岗位数组
  public posts: Post[] = []

  // 所有选中
  public checkedList: Post[] = []

  // 监听改变事件
  @Output()
  public checkedChange: EventEmitter<Post[]> = new EventEmitter()

  ngOnInit() {
  }

  change(checkedList: string[]) {
    const arr: Post[] = []
    this.posts.forEach((post) => {
      checkedList.forEach((ch) => {
        if (post.postCode === ch) {
          arr.push(post)
        }
      })
    })

    this.checkedList = arr

    this.checkedChange.emit(arr)
  }

  ngOnChanges() {
    const { postName, pageNo, isShowStop } = this
    this.postServer.getPostList({ postName, pageNo, isShowStop })
      .subscribe(
        (res) => {
          const { status, msg, data } = res
          if (status === 200) {
            const { pages, result } = data
            this.posts = result
            this.pages = pages
          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error('查询岗位列表失败，请稍后重试！')
        }
      )
  }

}

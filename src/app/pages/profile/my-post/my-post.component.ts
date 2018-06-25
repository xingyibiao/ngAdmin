import { Component, OnInit } from '@angular/core';
import { MyPostService, postResult } from '../../../serves/my-post/my-post.service'
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {

  constructor(private postService: MyPostService,
    private msg: NzMessageService) { }

  myPostList :postResult[]
  ngOnInit() {
    this.postService.getMyPostList().subscribe(
      (res) => {
        const { data, msg, status } = res;
        if (status === 200) {
          this.myPostList = data;
          // console.log(  this.myPostList)
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

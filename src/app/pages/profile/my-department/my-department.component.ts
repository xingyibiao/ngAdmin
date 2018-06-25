import { Component, OnInit } from '@angular/core';
import { MyDepartmentService, myDepartmentResult } from '../../../serves/my-department/my-department.service'
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-my-department',
  templateUrl: './my-department.component.html',
  styleUrls: ['./my-department.component.scss']
})

export class MyDepartmentComponent implements OnInit {

  constructor(private myDepartSer: MyDepartmentService,
    private msg: NzMessageService) { }

  myDepart = {
    officeName: '',
    empAndPostList: []
  }
  ngOnInit() {
    this.myDepartSer.myDepartmentList().subscribe(
      (res) => {
        const { data, msg, status } = res
        if (status === 200) {
         this.myDepart = data
        } else {
          this.msg.error(msg)
        }
      },
      () => {
        this.msg.error("网络错误,请稍后重试")
      }
    )
  }

}

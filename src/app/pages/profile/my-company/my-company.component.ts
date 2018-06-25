import { Component, OnInit } from '@angular/core';
import { MangerPostService } from '../../../serves/manger-post/manger-post.service';
import { MangerDepartmentService } from '../../../serves/manger-department/manger-department.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as $ from "jquery";
import 'orgchart';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent implements OnInit {

  constructor(private dept: MangerDepartmentService,
    private msg: NzMessageService) { }

  // public chartOption = TREE_OPTION

  public orgData = null

  ngOnInit() {
    // this.creatOrg()
    this.dept.getCompanyDepart('')
      .subscribe(
        (res) => {
          const { status, data, msg } = res
          if (status === 200) {
            const dataStr = JSON.stringify(data)
            let str = dataStr.replace(/child/g, 'children')

            const myCompany = {
              officeName: '董事会',
              officeCode: 'rootNode',
              
              children: []
            }
            myCompany.children = JSON.parse(str)
            this.orgData = myCompany
            this.creatOrg()

          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error('获取组织架构失败请稍后重试！')
        }
      )
  }

  public creatOrg() {

    var t = $('#org').orgchart({
      'data': this.orgData,
      //拖动整个架构图
      //'pan':true,
      //鼠标滚动控制大小
      'zoom':true,
      //最大放大缩小到多少
      'zoominLimit':30,
      'zoomoutLimit':0.9,
      /*控制方向The available values are t2b(implies "top to bottom", it's default value), b2t(implies "bottom to top"), l2r(implies "left to right"), r2l(implies "right to left").
      */
      'direction':'t2b',
      //以垂直方向布局，并指定深度
      //'verticalDepth':1,
      //设置数据内容的字段，与数据源对应
      'nodeTitle': 'officeName',
      'nodeID': 'officeCode',
      'toggleSiblingsResp':true
    })
  }
  

}


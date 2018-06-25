import { Component, OnInit, OnChanges, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MangerDepartmentService, OfficeDept } from '../../../serves/manger-department/manger-department.service';
import { NzMessageService, NzTreeNode, NzFormatEmitEvent } from 'ng-zorro-antd';

@Component({
  selector: 'app-office-tree',
  templateUrl: './office-tree.component.html',
  styleUrls: ['./office-tree.component.scss']
})
export class OfficeTreeComponent implements OnInit, OnChanges {

  constructor(private dept: MangerDepartmentService,
    private msg: NzMessageService) { }

  @Input()
  officeName: string = ''

  @Input()
  checkeds: string[] = []

  @Output()
  public checkedChange: EventEmitter<NzTreeNode> = new EventEmitter()


  public nodes: NzTreeNode[] = []

  private cacheNodes: NzTreeNode[] = []

  ngOnInit() {
  }

  ngOnChanges() {
    this.dept.getCompanyDepart(this.officeName)
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

            this.nodes = treeData
            this.cacheNodes = treeData
          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error('请求组织架构失败，请稍后重试！')
        }
      )
  }

  public treeChange(e: NzFormatEmitEvent) {
    // console.log(e.node.isChecked)
    if (e.node.isChecked) { // 选中
      const { checkedKeys } = e
      const len = checkedKeys.length
      const checked = checkedKeys[len - 1]
      // const key = checkedKeys.shift()
      // this.checkeds = [checkedKeys[0].key]

      // this.cacheNodes.map((cn) => {
      //   cn.clearChildren()
      // })

      // this.nodes = this.cacheNodes
      // console.log(checkedKeys, key)
      this.checkedChange.emit(checked)
    } else {
      this.checkeds = []
      this.checkedChange.emit()
    }
  }

}

import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NzMessageService, NzTreeNode, NzFormatEmitEvent } from 'ng-zorro-antd';
import { StockManService } from '../../../serves/stockMan/stock-man.service'
@Component({
  selector: 'app-product-tree',
  templateUrl: './product-tree.component.html',
  styleUrls: ['./product-tree.component.scss']
})
export class ProductTreeComponent implements OnInit {

  constructor(private productTree: StockManService,
    private msg: NzMessageService) { }

  @Input()
  categoryName:string = '';

  @Output()
  public checkedChange: EventEmitter<any> = new EventEmitter()

  public nodes: NzTreeNode[] = []

  
  ngOnInit() {
    this.getCategory();
  }
  // 获得分类
  getCategory(parentId: number = 0, e?: NzFormatEmitEvent) {
    let _data = []
    this.productTree.getProductCategory(parentId)
      .subscribe(
        (res) => {
          const { status, msg, data } = res
          if (status === 200) {
            _data = this.formDataToTree(data)
            if(!parentId || parentId === 0) {
              _data.forEach((d) => {
                this.nodes.push(new NzTreeNode(d))
              })
        
            } else {
              e.node.addChildren(_data)
              // return _data
            }
          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error('网络错误，请稍后重试！')
        }
      )

      // 
  }

  // 展开分类异步获取数据
  public mouseAction(name: string, e: NzFormatEmitEvent) {
    if (name === 'expand') {
      if (e.node.getChildren().length === 0 && e.node.isExpanded) {
        this.getCategory(+e.node.key, e)
      }
    }
  }

  // 将分类数据改为nzTree需要的数据格式
  formDataToTree(node: any[]): any[] {
    node.forEach((n) => {
      n.disableCheckbox = n.level !== 3
      n.isLeaf = n.level === 3
    })
    const nodeStr = JSON.stringify(node)

    let str = nodeStr.replace(/id/g, 'key')
      .replace(/categoryName/g, 'title')

    const nodeArr = JSON.parse(str)

    return nodeArr as any[]
    // nodeArr.f
  }

  // 点击checkbox 
  public checked(e: NzFormatEmitEvent) {
    const { isChecked, key, title } = e.node
    if (isChecked) {
      this.setCheced(+key)
      // this.categoryName = e.node.parentNode.parentNode.title
      //   + '>' + e.node.parentNode.title + '>' + title
      this.categoryName = title;
      
      this.checkedChange.emit(key)
    } else {
      this.setCheced(null)
    }
  }

  // 设置tree选中
  public setCheced(key: number) {
    function formate(node: NzTreeNode[]) {
      node.forEach((n) => {
        n.isChecked = (+n.key === key ?  true : false)
        if (n.children.length > 0) {
          formate(n.children)
        }
      })
    }
    formate(this.nodes)
  }
}

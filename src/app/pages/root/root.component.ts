import { Component, OnInit } from '@angular/core';
import { AuthServiceService, Menu, MainItem, UserInfo } from '../../serves/auth-service/auth-service.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SimpleReuseStrategy } from '../../share/simple-reuse-strategy';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  providers: [SimpleReuseStrategy]
})
export class RootComponent implements OnInit {

  constructor(private auth: AuthServiceService,
    private msg: NzMessageService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private titleService: Title
    ) { 
     // 路由事件
     this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild
        }
        return route
      }),
      filter((route) => { 
        return route.outlet === 'primary' 
      }),
      mergeMap((route) => {return route.data})
     )
     .subscribe((event) => {
       // 路由标题
       let title = event['title']
       this.mainItems.forEach((item) => {
         item.isSelect = false
       }) 
       
       // 如果没有title,则视为无用路由
       if (!title) {
         return
       }

       const menu: MainItem = {
         title: title,
         module: event['module'],
         power: event['power'],
         isSelect: true
       }

       this.titleService.setTitle(`企业管理平台--${title}`)

       const exitMenu = this.mainItems.find((item) => { return item.title === title })
       if (exitMenu) { // 如果存在
         this.mainItems.forEach((item) => { item.isSelect = item.title === title })
         return
       }
       this.mainItems.push(menu)
     })
  }

  // 菜单列表
  public menus: Menu[] = []

  // 用户信息
  public userInfo: UserInfo

  // 路由列表
  public mainItems: MainItem[] = []

  // 菜单是否折叠
  public isCollapsed: boolean = false

  private routerEvent() {
   
  }

  ngOnInit() {
    this.auth.getAuth()
      .subscribe(
        (res) => {
          const { status, msg, data } = res
          if (status === 200) {
            this.menus = data.menus
            this.userInfo = data.userInfo
            this.auth.menus.emit(data.menus)
          } else {
            this.msg.error(msg)
          }
        },
        () => {
          this.msg.error('网络错误，请稍后重试!')
        }
      )
  
    this.routerEvent()
  }

  // 关闭标签页
  public closeUrl(module: string, isSelect: boolean): void {
    // 当前关闭的是第几个路由
    let index = this.mainItems.findIndex((item) => { return item.module === module })
    // 如果只有一个不可关闭
    if (this.mainItems.length === 1) {
      return
    }

    this.mainItems = this.mainItems.filter((item) => item.module !== module)
    // 删除复用
    delete SimpleReuseStrategy.handlers[module]
    if (!isSelect) {
      return
    }
    // 显示上一个
    if (index === 0) {
      this.mainItems[index].isSelect = true
    } else {
      this.mainItems[index - 1].isSelect = true
    }

    const menu = this.mainItems.filter((item) => item.isSelect)[0]
    this.router.navigate(['/' + menu.module])
  }

  // 监听左侧菜单
  public changeCollapsed(isCollapsed: boolean) {
    this.isCollapsed = isCollapsed
  }

}



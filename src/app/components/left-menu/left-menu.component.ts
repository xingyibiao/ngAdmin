import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthServiceService, Menu } from '../../serves/auth-service/auth-service.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit, AfterViewInit {

  constructor(private auth: AuthServiceService,
    private msg: NzMessageService) { }

  public isCollapsed: boolean = false

  // 菜单列表
  @Input()
  public menus: Menu[] = []

  // 报告菜单折叠
  @Output()
  public changeCollapsed: EventEmitter<boolean> = new EventEmitter()

  // 折叠菜单
  public toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed
    this.changeCollapsed.emit(this.isCollapsed)
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }

  // 点击菜单
  public selectMenu(menu: Menu) {

  }

}

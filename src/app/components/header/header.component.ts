import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserInfo } from '../../serves/auth-service/auth-service.service';
import { LoginService } from '../../serves/login-service/login.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input()
  public userInfo: UserInfo = {
    avatar: '',
    email: '',
    phone: '',
    userName: '',
    mobile: '',
    wxOpenId: '',
    userType: ''
  }

  // 控制下拉框
  public showSelect: boolean = false

  constructor(private login: LoginService,
    private msg: NzMessageService,
    private router: Router) { }

  ngOnInit() {
    document.addEventListener('click', 
      this.hideSelect.bind(this)
    )
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.toggleShowSelect)
  }

  // 展示/隐藏下拉框
  public toggleShowSelect() {
    this.showSelect = !this.showSelect
  }

  // 隐藏下拉框
  public hideSelect() {
    this.showSelect = false
  }

  // 阻止冒泡
  public stop(e: MouseEvent) {
    e.stopPropagation()
  }

  // 返回首页
  public goHome(): void {
    location.href = '/'
  }

  // 登出
  public logout() {
    this.login.logout()
      .subscribe(
        (res) => {
          const { status, msg } = res
          if (status === 200) {
            this.msg.success('退出登陆成功，请重新登陆')
            this.router.navigate(['/login'])
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

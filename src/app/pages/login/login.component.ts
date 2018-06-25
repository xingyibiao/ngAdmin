import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../serves/login-service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup

  constructor(private loginService: LoginService,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private router: Router) { }

  // 登录
  public login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .subscribe(
          (res) => {
            const { status, msg } = res
            if (status === 200) {
              this.msg.success('登录成功!')
              this.router.navigate([''])
            } else {
              this.msg.error(msg)
            }
          },
          (err) => {
            console.log(err)
            this.msg.error('网络错误，请稍后重试！')
          }
        )
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }

}

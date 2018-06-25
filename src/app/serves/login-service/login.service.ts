import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Res } from '../interfaces/res.interface';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  // 登录
  public login(loginData: LoginData): Observable<Res<string>> {
    return this.http.post<Res<string>>('/api/login/auth', loginData)
  }

  // 登出
  public logout(): Observable<Res> {
    return this.http.get<Res>('/api/login/logout')
  }

}

export interface LoginData {
  username: string
  password: string
}

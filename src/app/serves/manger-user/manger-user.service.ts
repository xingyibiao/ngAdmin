import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Res } from '../interfaces/res.interface';

@Injectable()
export class MangerUserService {

  constructor(private http: HttpClient) { }

  // 获得员工列表
  public getUsers(info: GetUserInfo): Observable<Res<pageMappler>> {
    return this.http.post<Res<pageMappler>>('/api/sysUser/listEmployee', info)
  }

  // 获得员工详情
  public getUserByCode(usercode: string): Observable<Res<UserDetail>> {
    return this.http.post<Res<UserDetail>>('/api/sysUser/getSysEmployee', { usercode })
  }

  // 删除员工
  public delUserByCode(usercode: string): Observable<Res> {
    return this.http.post<Res>('/api/sysUser/deleteSysEmployee', { usercode })
  }

  // 保存员工
  public saveUser(user: saveUserInfo): Observable<Res> {
    return this.http.post<Res>('/api/sysUser/saveSysEmployeeMapper', { ...user })
  }
}

interface pageMappler {
  total: number
  pages: number
  pageNo: number
  pageSize: number
  list: User[]
}

// 
export interface GetUserInfo {
  pageNo?: number
  pageSize?: number
  nameorlogin: string
  status: number
}

export interface saveUserInfo {
  usercode: string
  logincode: string
  syspostcode: string
  status: string
  officecode: string
  officename: string
  username: string
}

// userInfo
export interface User {
  empname: string
  createdate: string
  logincode: string
  usercode: string
  status: string
  postnames: PostName[]
}

export interface UserDetail {
  officename: string
  post: PostName[]
  officecode: string
  logincode: string
  usercode: string
  username: string
  status: string
}

export interface PostName {
  postname: string
  postcode?: string
}
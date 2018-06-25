import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Res } from '../interfaces/res.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  // 菜单及权限
  public menus: EventEmitter<Menu[]> = new EventEmitter()


  // 获得菜单及权限
  getAuth(): Observable<Res<AuthInfo>> {
    return this.http.get<Res<AuthInfo>>('/api/login/getInfo')
  }

}

// 菜单
export interface Menu{
  menuCode: string
  menuHref: string
  menuIcon: string
  menuName: string
  menuPinyin: string
  parentCode: string
  permission: string[]
  treeSort: number
  children: Menu[]
}

export interface AuthInfo {
  menus: Menu[]
  userInfo: UserInfo
}

export interface MainItem {
  title: string
  module: string
  power: string
  isSelect: boolean
}

export interface UserInfo {
  avatar: string // 头像
  email: string 
  mobile: string
  phone: string
  userName: string
  userType: string
  wxOpenId: string
}

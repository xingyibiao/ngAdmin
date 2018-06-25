import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Res } from '../interfaces/res.interface';

export interface roleReq{
  pageNo: number,
  roleName_like: string,
  roleCode_like: string,
  userType: string,
  isSys: string,
  status: string
}
export interface roleResult{
   result: detailResult[],
   total: number,
   pages: number,
   pageNo: number,
   pageSize: number
}
export interface detailResult{
  roleCode: string,
  roleName: string,
  createDate: string
}
export interface SaveInfo{
  roleCode: string,
  roleName: string
}
export interface RoleMenu{
  parentCode: string,
  menuPinyin: string,
  menuCode: string,
  menuHref: string,
  menuName: string,
  child:string
}
export interface Child{
  parentCode: string,
  menuPinyin: string,
  menuCode: string,
  menuHref: string,
  menuName: string,
  child: string
}
export interface SaveMenuInfo {
  roleCode: string
  roleMenuListJson:string
}

@Injectable()
export class MangerRoleService {

  constructor(private http:HttpClient) { }
    // 查询角色列表
   public getRoleList(roleReq:roleReq):Observable<Res<roleResult>>{
     return this.http.post<Res<roleResult>>('/api/sysRole/page',roleReq)
   }
   // 获取详情
   public addEditRole(roleCode:string):Observable<Res>{
     return this.http.post<Res>('/api/sysRole/get',{roleCode})
   }
   // 保存或编辑
   public saveRole(info:SaveInfo):Observable<Res>{
     return this.http.post<Res>('/api/sysRole/save',info)
   }
   // 删除
   public deleRole(roleCode:string):Observable<Res>{
     return this.http.post<Res>('/api/sysRole/delete',{roleCode})
   }
   // 获取功能菜单
   public getRoleMenu(roleCode:string):Observable<Res>{
    return this.http.post<Res>('/api/sysRoleMenu/list',{roleCode})
   }
   // 保存选中的功能菜单
   public saveRoleMenu(info:SaveMenuInfo):Observable<Res>{
     return this.http.post<Res>('/api/sysRoleMenu/save',info)
   }
  }
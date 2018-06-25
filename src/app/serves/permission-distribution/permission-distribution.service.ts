import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Res } from '../interfaces/res.interface';

export interface EmployReq {
  officeCode: string,
  userName: string,
  loginCode: string,
  status: string,
  pageNo: string
}
export interface EmployResult {
  result: DetailResult[]
  total: string,
  pages: string,
  pageNo: string,
  pageSize: string
}
export interface DetailResult {
  officeName: string,
  postName: string,
  loginCode: string,
  officeCode: string,
  postCode: string,
  userName: string,
  userCode: string,
  status: string
}
// 组织架构
export interface OfficeDept {
  officeName: string
  parentCode: string
  officeCode: string
  child: OfficeDept[]
}
// 人员与角色绑定
export interface UserRoleReq{
  userCode: string,
  roleCode: string
}
@Injectable()
export class PermissionDistributionService {
  constructor(private http: HttpClient) { }

  // 获取人员列表
  public getEmployeeList(employReq: EmployReq): Observable<Res<EmployResult>> {
    return this.http.post<Res<EmployResult>>('/api/sysUser/employeeList', employReq)
  }

  // 获取组织架构
  public getEnterpiseList(officeName: string): Observable<Res<OfficeDept>> {
    return this.http.post<Res<OfficeDept>>('/api/sysOffice/findCompanyDept', officeName)
  }

  // 查询角色列表
  public getRoleList(userCode: string): Observable<Res> {
    return this.http.get<Res>(`/api/sysRole/list?userCode=${userCode}`)
  }
  // 人员与角色绑定多对多
  public saveUserRole(userRoleReq:UserRoleReq):Observable<Res>{
   return this.http.post<Res>('/api/sysRole/saveUserRoleRelation',userRoleReq)
  }
    // 人员与角色绑定一对多
  public saveSingleUserRole(userRoleReq:UserRoleReq):Observable<Res>{
    return this.http.post<Res>('/api/sysRole/saveOrUpdateRole',userRoleReq)
   }
}

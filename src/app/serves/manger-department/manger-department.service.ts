import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Res } from '../interfaces/res.interface';

@Injectable()
export class MangerDepartmentService {

  constructor(private http: HttpClient) { }

  // 获得机构列表
  public getOfficeList(info: GetOfficeListInfo): Observable<Res<OfficeResult>> {
    return this.http.post<Res<OfficeResult>>('/api/sysOffice/listOffice', info)
  }

  // 删除部门
  public deleteOffice(officeCode: string): Observable<Res> {
    return this.http.post<Res>('/api/sysOffice/deleteOffice', { officeCode })
  }

  // 获得所有我的企业组织架构
  public getCompanyDepart(officeName = ''): Observable<Res<OfficeDept[]>> {
    return this.http.get<Res<OfficeDept[]>>(`/api/sysOffice/findCompanyDept?officeName=${officeName}`)
  }

  // 获取所有人员
  public getUsers(userName: string): Observable<Res<User[]>> {
    return this.http.get<Res<User[]>>(`/api/sysOffice/listUser?userName=${userName}`)
  }

  // 根据code获得部门详情
  public getOfficeByCode(officeCode: string): Observable<Res<Office>> {
    return this.http.get<Res<Office>>(`/api/sysOffice/getSysOffice?officeCode=${officeCode}`)
  }

  // 编辑、新增机构
  public saveOffice(office: Office): Observable<Res> {
    return this.http.post<Res>('/api/sysOffice/save', office)
  }

}

export interface GetOfficeListInfo {
  parentCode?: string
  officeName: string
  pageNo?: number
  pageSize?: number 
}

export interface OfficeResult {
  total: number
  result: Office[]
}

export interface Office {
  officeName: string
  officeType: string // 1、主公司， 2、子公司， 3、部门
  parentCode: string // 所属公司、部门编号
  extendS4: string // 所属公司、部门名称
  leader: string // 负责人
  createDate: string // 添加日期
  officeCode: string // 部门编码，主键
  fullName: string // 部门全程
  subLeader: string // 副主管
  leaderCode: string // 主管编码
  subLeaderCode: string // 副主管编码
}

// 组织架构
export interface OfficeDept {
  officeName: string
  parentCode: string
  officeCode: string
  child: OfficeDept[]
}


export interface User {
  loginCode: string
  userName: string
  userCode: string
  checked?: boolean
}
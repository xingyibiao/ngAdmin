import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Res } from '../interfaces/res.interface';
import * as qs from "qs";
export interface CompanyReq{
  childrenCompanyName: string,
  pageNo: number
}
export interface CompanyResult{
  sysCompanyes:SysCompanyes[]
  pages: number
  total: number
  pageNo: number
  pageSize: number
}
export interface SysCompanyes{
  companyCode: string,
  companyName: string,
  belongCompanyName: string,
  createDate: string
}
export interface SaveInfo{
  companyCode: string,
  companyName: string
}
@Injectable()
export class MangerCompanyService {

  constructor(private http: HttpClient) { }

   // 获得子公司列表
  public getCompanyList(companyReq:CompanyReq):Observable<Res<CompanyResult>>{
    return this.http.get<Res<CompanyResult>>(`/api/sysCompany/selectSysCompany?${qs.stringify(companyReq)}`)
  }

  // 获子公司详情
  public addEditCompany(companyCode:string):Observable<Res>{
     return this.http.post<Res>('/api/sysCompany/detailsSysCompany',{companyCode})
  }

  // 保存和编辑
  public saveCompanyInfo(info:SaveInfo):Observable<Res>{
    return this.http.post<Res>('/api/sysCompany/saveSysCompany',info)
  }

  // 删除
  public deleComPany(companyCode:string):Observable<Res>{
     return this.http.post<Res>('/api/sysCompany/deleteSysCompany/companyCode',{companyCode})
  }
}

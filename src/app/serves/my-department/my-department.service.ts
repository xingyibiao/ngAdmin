import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Res } from '../interfaces/res.interface';


@Injectable()
export class MyDepartmentService {

  constructor(private http:HttpClient) { }

  public myDepartmentList():Observable<Res<myDepartmentResult>>{
    return this.http.post<Res<myDepartmentResult>>('/api/sysOffice/slelectMyOffice','')
  }
}
export interface myDepartmentResult{
  officeName: string
  empAndPostList: string[]
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Res } from '../interfaces/res.interface';

@Injectable()
export class MyPostService {

  constructor(private http:HttpClient) { }
  
  public getMyPostList():Observable<Res<postResult[]>>{
   return this.http.post<Res<postResult[]>>('/api/sysUser/userPost','')
  }
}
export interface postResult{
  syspost:Syspost
}
export interface Syspost{
  postName: string,
  remarks: string
}
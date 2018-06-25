import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import * as qs from "qs";

import { Res } from '../interfaces/res.interface';

@Injectable()
export class MangerPostService {

  constructor(private http: HttpClient) { }

  // 获得岗位列表
  public getPostList(reqData: getPostListReq): Observable<Res<PostResult>> {
    return this.http.get<Res<PostResult>>(`/api/post/list?${qs.stringify(reqData)}`)
  }

  // 获得岗位详情
  public getPostByCode(postCode: string): Observable<Res<Post>> {
    return this.http.get<Res<Post>>(`/api/post/get?postCode=${postCode}`)
  }

  // 删除岗位
  public deletPost(postCode: string): Observable<Res> {
    return this.http.post<Res>('/api/post/delete', { postCode })
  }

  // 保存岗位
  public savePost(post: SaveInfo): Observable<Res> {
    return this.http.post<Res>('/api/post/save', post)
  }
}
export interface getPostListReq {
  postName: string
  isShowStop: boolean
  pageNo?: number
  pageSize?: number
}

export interface Post {
  postCode: string
  postName: string
  remarks: string
  createDate: string
  corpName: string
  checked?: boolean
}

export interface PostResult {
  result: Post[]
  pages: number
  total: number
  pageNo: number
  pageSize: number
}

// 新增、修改保存信息
export interface SaveInfo {
  postName: string
  postRemarks: string
  postCode: string
}
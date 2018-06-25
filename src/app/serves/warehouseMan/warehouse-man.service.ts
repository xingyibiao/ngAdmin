import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Res } from '../interfaces/res.interface';

@Injectable()
export class WarehouseManService {

  constructor(private http:HttpClient) { }
 // 获取仓库列表
  getWarehouseMan(info:WarehouseReq):Observable<Res<WarehouseResult>>{
    return this.http.post<Res<WarehouseResult>>('/api/wm/wmWarehouse/wmWarehouses',info)
  }
  // 删除仓库
  delWarehouseMan(id:number):Observable<Res>{
    return this.http.get<Res>(`/api/wm/wmWarehouse/deleteWarehouse/id?id=${id}`)
  }
  // 得到仓库详情
  getWarehouseManDetail(id:number):Observable<Res<Detail>>{
    return this.http.get<Res<Detail>>(`/api/wm/wmWarehouse//wmWarehouse/id?id=${id}`)
  }
  // 保存仓库信息
  saveWarehouseManInfo(info:SaveInfoReq):Observable<Res<SaveInfoReq>>{
    return this.http.post<Res<SaveInfoReq>>('/api/wm/wmWarehouse/save',info)
  }
  // 获得省市区
  
}
export interface WarehouseReq{
  pageNo: number,
  wmWarehouseName: string
}

export interface WarehouseResult{
  total: number,
  pages: number,
  pageNumber: number,
  wmWarehouseList: List[]
}
export interface List{
  id: number,
  warehouseName: string,
  personCharge: string,
  personTel: string,
  warehouseAdress: string
}

export interface Detail{
  warehouseName: string,
  personCharge: string,
  personTel: string,
  warehostLocation: string,
  warehostLocationCode: string,
  warehouseAdress: string,
  warehouseCapacity: string,
  warehouseDefault: string
}

export interface SaveInfoReq{
  flag: number,
  id: number,
  warehouseName: string,
  personCharge: string,
  personTel: string,
  warehostLocation: string,
  warehostLocationCode: string,
  warehouseAdress: string,
  warehouseCapacity: string,
  warehouseDefault: number
}
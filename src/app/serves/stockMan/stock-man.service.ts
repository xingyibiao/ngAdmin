import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Res } from '../interfaces/res.interface';

@Injectable({
  providedIn: 'root'
})
export class StockManService {

  constructor(private http:HttpClient) { }
  // 获得货品列表
  getStockMan(info:StockListReq):Observable<Res<StockListResult>>{
    return this.http.post<Res<StockListResult>>('/api/wm/wmproduct/wmproducts',info)
  }
  // 添加一个新商品
  getNewsProduct(info:AddProductReq):Observable<Res>{
    return this.http.post<Res>('/api/wm/wmproduct/addWmProduct',info)
  }
  // 进货入库保存
  saveStorage(info:storageReq):Observable<Res>{
    return this.http.post<Res>('/api/wm/wmproduct/storageSave',info)
  }
  // 销售出库保存
  saveOutBound(info:outBoundReq):Observable<Res>{
    return this.http.post<Res>('/api/wm/wmproduct/outageSave',info)
  }
  // 获得产品列表
  getProductCategory(parentId):Observable<Res>{
    return this.http.get<Res>(`/api/wm/wmproduct/productCategory?parentId=${parentId}`)
  }
}
export interface StockListReq{
  productCode: string,
  productTypeId: string,
  warehouseName: string,
  productName: string,
  timeRange: string,
  flag: number,
  pageNo: number
}

export interface StockListResult{
  total: number,
  pages: number,
  pageNum: number,
  wmProductList:Detail[]
}
export interface Detail{
  productCode: string,
  productName: string,
  productType: string,
  productSpec: string,
  costAveragePrice: string,
  id: number,
  unit: string,
  unitPrice: string,
  productTotalAmount: string,
  stock: string
}

export interface AddProductReq{
  productCode: string,
  productName: string,
  productSpec: string,
  productTypeId: string,
  unit: string,
  unitPrice: string,
  stock: string
}
export interface storageReq{
  data: any,
  supplierName: string,
  orderNumber: string,
  storageTime: string,
  storageAmount: string,
  warehouseId: number,
  warehouseName: string,
  type: number,
  operator: string,
  remark: string,
  inventoryCode: string
}
export interface outBoundReq{
  data: any,
  customer: string,
  orderNumber: string,
  outageTime: string,
  outageAmount: string,
  warehouseId: number,
  warehouseName: string,
  type: number,
  operator: string,
  remark: string,
  inventoryCode: string
}
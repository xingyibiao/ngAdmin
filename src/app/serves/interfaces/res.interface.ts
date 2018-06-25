// 服务器返回响应类型
export interface Res<T = any> {
  data: T
  status: number
  msg: string
}
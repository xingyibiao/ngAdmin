import { HTTP_INTERCEPTORS } from '@angular/common/http'

// 设置token请求头
import { SetTokenHeaderInterceptor } from './set-token-header-interceptor'

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: SetTokenHeaderInterceptor, multi: true }
]
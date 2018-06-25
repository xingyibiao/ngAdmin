import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import * as qs from 'qs'

import { Observable } from 'rxjs'
import { AuthServiceService } from '../serves/auth-service/auth-service.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SimpleReuseStrategy } from '../share/simple-reuse-strategy';

@Injectable()
export class SetTokenHeaderInterceptor implements HttpInterceptor {
  constructor(private auth: AuthServiceService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const { body, method, headers } = req
    const customerHeaders = {
      'Content-Type': headers.get('Content-Type') || 'application/x-www-form-urlencoded'
    }
    const reqWithToken = req.clone({
      setHeaders: customerHeaders,
      body: method.toLocaleLowerCase() === 'post' || !headers.get('Content-Type') ? qs.stringify(body) : body
    })

    return next.handle(reqWithToken)
      .pipe(
        tap(
          (event) => {
            if (event instanceof HttpResponse) {
              // console.log(event.body)
              const { status } = event.body
              switch(status) {
                case 20011:
                  this.router.navigate(['/login'])
                  // 清空所有缓存路由
                  SimpleReuseStrategy.handlers = {}
                  break;
              }
            }
          }
        )
      )
  }
}
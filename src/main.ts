import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';


import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import '../node_modules/ng-zorro-antd/src/ng-zorro-antd.less'

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
registerLocaleData(zh);
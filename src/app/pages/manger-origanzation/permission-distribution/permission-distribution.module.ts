import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionDistributionRoutingModule } from './permission-distribution-routing.module';
import { PermissionDistributionComponent } from './permission-distribution.component';
import { PermissionDistributionService } from '../../../serves/permission-distribution/permission-distribution.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AuthModelModule } from '../../../share/directive/auth-model.module';
@NgModule({
  imports: [
    CommonModule,
    PermissionDistributionRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    AuthModelModule,
    ReactiveFormsModule
  ],
  declarations: [
    PermissionDistributionComponent
  ], 
  providers: [
    PermissionDistributionService
  ]
})
export class PermissionDistributionModule { }

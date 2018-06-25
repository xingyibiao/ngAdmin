import { Routes } from "@angular/router";
import { RootComponent } from "../pages/root/root.component";

export const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'bmgl',
        loadChildren: 'app/pages/manger-origanzation/manger-department/manger-department.module#MangerDepartmentModule',
        data: {
          title: '部门管理',
          module: 'bmgl',
          power: 'SHOW'
        }
      },
      {
        path: 'gwgl',
        loadChildren: 'app/pages/manger-origanzation/manger-post/manger-post.module#MangerPostModule',
        data: {
          title: '岗位管理',
          module: 'gwgl',
          power: 'SHOW'
        }
      },
      {
        path: 'gsgl',
        loadChildren: 'app/pages/manger-origanzation/manger-company/manger-company.module#MangerCompanyModule',
        data: {
          title: '公司管理',
          module: 'gsgl',
          power: 'SHOW'
        }
      },
      {
        path: 'jsgl',
        loadChildren: 'app/pages/manger-origanzation/manger-role/manger-role.module#MangerRoleModule',
        data: {
          title: '角色管理',
          module: 'jsgl',
          power: 'SHOW'
        }
      },
      {
       path: 'qxgl',
       loadChildren: 'app/pages/manger-origanzation/permission-distribution/permission-distribution.module#PermissionDistributionModule',
       data: {
         title: '权限分配',
         module: 'qxgl',
         power: 'SHOW'
       }
      },
      {
        path: 'yggl',
        loadChildren: 'app/pages/manger-origanzation/manger-user/manger-user.module#MangerUserModule',
        data: {
          title: '人员管理',
          module: 'yggl',
          power: 'SHOW'
        }
      },
      {
        path:'wdbm',
        loadChildren: 'app/pages/profile/my-department/my-department.module#MyDepartmentModule',
        data: {
          title: '我的部门',
          module: 'wdbm',
          power: 'SHOW'
        } 
      },
      {
        path: 'wdqy',
        loadChildren: 'app/pages/profile/my-company/my-company.module#MyCompanyModule',
        data: {
          title: '我的企业',
          module: 'wdqy',
          power: 'SHOW'
        }
      },
      {
        path: 'wdgw',
        loadChildren: 'app/pages/profile/my-post/my-post.module#MyPostModule',
        data: {
          title: '我的岗位',
          module: 'wdgw',
          power: 'SHOW'
        }
      },
      {
        path: 'ckgl',
        loadChildren: 'app/pages/warehouse-man/warehouse-man.module#WarehouseManModule',
        data: {
          title: '仓库管理',
          module: 'ckgl',
          power: 'SHOW'
        }
<<<<<<< .mine
      },
      {
        path: 'bdsj',
        loadChildren: 'app/pages/activiti/form-design/form-design.module#FormDesignModule',
        data: {
          title: '流程表单设计器',
          module: 'bdsj',
          power: 'SHOW'
        }
||||||| .r309
=======
      },
      {
        path: 'chgl',
        loadChildren: 'app/pages/warehouse-man/stock-man/stock-man.module#StockManModule',
        data: {
          title: '存货管理',
          module: 'chgl',
          power: 'SHOW'
        }
>>>>>>> .r319
      }
    ]
  }
]

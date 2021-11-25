import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilesComponent } from './files/files.component';

const routes: Routes = [
  { path: '', redirectTo: '/files', pathMatch: 'full' }, 
  { 
    path: 'files',  // 用来匹配浏览器地址栏中 URL 的字符串
    component: FilesComponent // 导航到该路由时，路由器应该创建的组件
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: FilesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // 导入路由模块，并注册路由词典，用于根模块中
  exports: [RouterModule]  // 导出路由，以便在其他程序中生效
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../route-guards/admin.guard';
import { AuthGuard } from '../route-guards/auth-guard.guard';
import { MenuManagmentComponent } from './menu-managment/menu-managment.component';
import { TableManagmentComponent } from './table-managment/table-managment.component';

const routes: Routes = [
  {
     path: 'table-managment',
     component: TableManagmentComponent,
    //  canActivate:[AuthGuard],

  },
  {
    path: 'menu-managment',
    component: MenuManagmentComponent,
    // canActivate:[AuthGuard],

 },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

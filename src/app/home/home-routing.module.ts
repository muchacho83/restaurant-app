import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBookingsComponent } from '../customer/my-bookings/my-bookings.component';
import { NewOrderComponent } from '../customer/new-order/new-order.component';
import { AdminGuard } from '../route-guards/admin.guard';
import { AuthGuard } from '../route-guards/auth-guard.guard';
import { UserGuard } from '../route-guards/user.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: 'home-page',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: 'user',
        canActivate: [UserGuard],
        canLoad:[UserGuard],
        loadChildren: () =>
          import('../customer/customer.module').then((m) => m.CustomerModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AdminGuard],
        canLoad:[AdminGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

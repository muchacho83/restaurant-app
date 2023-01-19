import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NewOrderComponent } from './new-order/new-order.component';

const routes: Routes = [
  {
    path: 'new-order',
    component: NewOrderComponent,
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard],
  },
  {
    path: 'myBookings',
    component: MyBookingsComponent,
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard],
  },
  {
    path:"myOrders",
    component:MyOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

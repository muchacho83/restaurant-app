import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { AuthGuard } from '../route-guards/auth-guard.guard';
import { UserGuard } from '../route-guards/user.guard';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { PopupComponent } from './popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    MyOrdersComponent,
    NewOrderComponent,
    MyBookingsComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,

  ],
  providers:[
    AuthGuard,
    UserGuard
  ]
})
export class CustomerModule { }

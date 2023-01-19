import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/admin/services/admin-menu.service';
import { Bookings, Order, OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  myBookings: Bookings[] = [];
  Order: MenuItem[] = [];
  totalPrice:number = 0;
  viewOrder(booking: Bookings) {
    this.Order=[];
    this.totalPrice=0;
    this.myBookings.forEach((item) => {
      if (item.id === booking.id) {
        // console.log(item.order)
        item.order.forEach((data) => {
          this.totalPrice=data.totalPrice;
          data.item.forEach((itemData) => this.Order.push(itemData));
        });
      }
    });
    console.log(this.Order);
  }
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getBookings().subscribe((data) => {
      this.myBookings = <Bookings[]>(<unknown>data);
    });
  }
}

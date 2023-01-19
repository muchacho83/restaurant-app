import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from 'src/app/admin/services/admin-menu.service';
import { PopupComponent } from '../popup/popup.component';
import { Bookings, OrderService } from '../services/order.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent implements OnInit {
  constructor(private orderService: OrderService, public dialog: MatDialog) {}
  Order: MenuItem[] = [];
  totalPrice: number = 0;
  quantity: string[] = [];
  date = new Date();
  currentlyBooking!: Bookings;
  myBookings: Bookings[] = [];
  id:string='';
  bookingsOrder: MenuItem[] = [];
  // chosenItem!: MenuItem;
  addToOrder(booking: Bookings) { 
    this.Order=[];
    this.totalPrice=0;   
    this.currentlyBooking = booking;
    this.dialog.open(PopupComponent, {
      width: '250px',
    });
  }
  placeOrder() {
    
    this.currentlyBooking.order.push({"item":this.Order,"totalPrice":this.totalPrice})
      this.myBookings.forEach(item=>{
        if(item.id===this.currentlyBooking.id){
          item.order=this.currentlyBooking.order
          // for(let bookingItem of this.currentlyBooking.order){
          //   item.order.push(bookingItem)
          //   break;
          // }
         }
      })
      // console.log(this.myBookings)
      // console.log(this.myBookings)
      console.log(this.currentlyBooking)
    this.orderService.addToOrder(this.myBookings).subscribe(data=>console.log(data))
    this.Order = []; 
    this.totalPrice = 0;
  }
  removeItem(item:MenuItem){
    this.Order.forEach((orderItem,index) => {
      if(orderItem.id===item.id){
        this.Order.splice(index,1)
      }
    })
    console.log(this.Order)
  }
  ngOnInit(): void {
    this.orderService.popupOption.subscribe((data) => {
      data.forEach((item) => {
        item.item.quantity = item.quantity;
        this.Order.push(item.item);
        this.totalPrice += item.item.price * <number>(<unknown>item.quantity);
      });
    });
    this.orderService.getBookings().subscribe((data) => {
      this.myBookings = <Bookings[]>(<unknown>data);
      for (let item of data) {
        for (let orderItem of item.order) {
          this.bookingsOrder = orderItem.item;
        }
      }
    });
  }
}

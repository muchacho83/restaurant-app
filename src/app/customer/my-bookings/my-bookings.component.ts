import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { filter, pluck } from 'rxjs';
import { Table } from 'src/app/admin/services/admin.service';
import { BookingService } from '../services/booking.service';
import { Bookings } from '../services/order.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit {
  bookingForm = this.fb.group({
    date: [''],
    tableNumber: [''],
  });
  chosenTable = '';
  Tables: Table[] = [];
  myBookings:Bookings[]=[];
  book() {
    // console.log(<Table>(<unknown>this.bookingForm.get('tableNumber')?.value));
    this.bookingService
      .updateTable(
        <Table>(<unknown>this.bookingForm.get('tableNumber')?.value),
        <string>this.bookingForm.get('date')?.value
      )
      .subscribe(() => {
        this.bookingForm.reset({ date: '', tableNumber: '' });
        this.Tables = [];
        // console.log(this.Tables.length);
      });
      this.bookingService.updateBooking(<string>this.bookingForm.get("date")?.value,<Table><unknown>this.bookingForm.get("tableNumber")?.value,this.myBookings)
  }
  getAvailableTable() {
    this.bookingService
      .getAvailableTables(<string>this.bookingForm.get('date')?.value)
      .subscribe((data) => {
        this.Tables = data.filter((item) => {
          for (let date of <Array<string>>(item.bookedForDates)) {
            if (date === <string>this.bookingForm.get('date')?.value) {
              return false;
            }
          }

          return true;
        });
      });
  }
  getMyBookings(){
    this.bookingService.getMyBookings().subscribe(
      data=> this.myBookings=data
    )

  }
  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.bookingForm.get('date')?.valueChanges.subscribe(() => {
      if (this.bookingForm.get('date')?.value !== '') {
        this.getAvailableTable();
      }
    });
    this.getMyBookings();
  }
}

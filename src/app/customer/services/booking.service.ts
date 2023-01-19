import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { filter, map } from 'rxjs';
import { Table } from 'src/app/admin/services/admin.service';
import { Bookings, User } from './order.service';
import {v4 as v4 } from 'uuid'

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  dbUrl = 'http://localhost:3000/tables';
  userUrl=`http://localhost:3000/600/users/${this.cookieService.get("id")}/bookings`
  header=new HttpHeaders().set("Authorization",`Bearer ${this.cookieService.get("key")}`)

  getAvailableTables(setDate: string) {
    return this.http.get<Table[]>(`${this.dbUrl}?_sort=number&_order=asc`);
  }
  updateTable(table:Table,bookedDate:string) {
    return this.http.patch(`${this.dbUrl}/${table.id}`, {"bookedForDates":[bookedDate,...<Array<string>>table.bookedForDates]  });
  }
  getMyBookings(){
    return this.http.get<User>(`http://localhost:3000/600/users/${this.cookieService.get("id")}`,{headers:this.header}).pipe(
      map(data => data.bookings)
    )
  }
  updateBooking(date:string,table:Table,bookings:Bookings[]){
    return this.http.patch(`http://localhost:3000/600/users/${this.cookieService.get("id")}`,{"bookings":[...bookings,{id:v4(),"date":date,"bookedTable":table.number,"order":[]}]},{headers:this.header}).subscribe(data =>console.log(data))
  }
  constructor(private http: HttpClient,private cookieService:CookieService) {}
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { MenuItem } from 'src/app/admin/services/admin-menu.service';
import {v4 as v4} from "uuid"
@Injectable({
  providedIn: 'root'
})

export class OrderService  {
  dbUrl="http://localhost:3000/menu"
  popupOption= new Subject<popupOrder[]>(/*{quantity:"",isDone:false}*/);

  getItems(){
    return this.http.get<MenuItem[]>(`${this.dbUrl}?status=true`)
  } 
  header=new HttpHeaders().set("Authorization",`Bearer ${this.cookieService.get("key")}`)
  getBookings(){
    return this.http.get<User>(`http://localhost:3000/600/users/${this.cookieService.get("id")}`,{headers:this.header}).pipe(
      map(data => data.bookings)
    )
  }
  addToOrder(booking:Bookings[]){
    return this.http.patch(`http://localhost:3000/600/users/${this.cookieService.get('id')}`,{"bookings":[...booking],},{headers:this.header})
  }
  constructor(private http:HttpClient,private cookieService:CookieService) { }
}
// booking,...this.getBookings()
export interface User{
  email:string,
  password:string,
  mobile:string,
  name:string,
  lastName:string,
  bookings:Bookings[],
  id:string
}
export interface Bookings{
  id:string;
  date:string,
  bookedTable:string,
  order:Order[]
}
export interface Order{
  item:MenuItem[],
  totalPrice:number
}
export interface popupOrder{
  item:MenuItem,
  quantity:string
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminMenuService {
  dbUrl = 'http://localhost:3000/menu';
  getItems() {
    return this.http.get<MenuItem[]>(this.dbUrl);
  }
  addItems(item: MenuItem) {
    return this.http.post(this.dbUrl, item);
  }
  removeItems(id: string) {
    return this.http.delete(`${this.dbUrl}/${id}`);
  }
  updateStatus(id:string,status:boolean) {
    return this.http.patch(`${this.dbUrl}/${id}`,{"status":status})
  }
  updateItem(updatedItem:MenuItem){
    return this.http.put(`${this.dbUrl}/${updatedItem.id}`,updatedItem)
  }
  constructor(private http:HttpClient) { }
}
export interface MenuItem{
  id:string,
  type:string,
  name:string,
  summary:string,
  desciption:string,
  price:number,
  status:boolean,
  quantity?:string

}


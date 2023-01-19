import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuItem } from 'src/app/admin/services/admin-menu.service';
import { OrderService, popupOrder } from '../services/order.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  constructor(private orderService: OrderService, private fb :FormBuilder) {}
  selectedOption = new FormGroup({
    item :new FormControl<MenuItem>({id:'',type:'',name:'',summary:',',desciption:'',price:0,status:false,quantity:"0"}),
    quantity:new FormControl('')
  })
  menu:MenuItem[]=[]
  popupOrder:popupOrder[]=[];
  addToOrder(){;

    this.selectedOption.get("item")?.setValue(this.selectedOption.get("item")!.value)
    // this.selectedOption.get("item")!.value!.quantity=this.selectedOption.get("quantity")?.value
    this.popupOrder.push(<popupOrder><unknown>this.selectedOption?.value)
    // console.log(this.popupOrder)
    // this.popupOrder.forEach(item=>console.log(item))
  }
  close() {
    if (<string>this.selectedOption?.value !== '') {
       this.orderService.popupOption.next(this.popupOrder);
    }
    
    this.selectedOption.reset();
    
  }
  ngOnInit(): void {
    this.orderService.getItems().subscribe((data) => (this.menu = data));

  }
}
// interface popupOrderInterface{
//   item:MenuItem,
//   quantity: string
// }

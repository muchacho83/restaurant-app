import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {  AdminMenuService, MenuItem } from '../services/admin-menu.service'
import { v4 as v4 } from 'uuid';
@Component({
  selector: 'app-menu-managment',
  templateUrl: './menu-managment.component.html',
  styleUrls: ['./menu-managment.component.css'],
})
export class MenuManagmentComponent implements OnInit {
  menu: MenuItem[] = [];
  currentlyEditing!: MenuItem;
  editing:boolean=false;
  loadItems() {
    this.menuService.getItems().subscribe((data) => {
      this.menu = data;
    });
  }
  checkBoxChange(id: string, status: boolean) {
    this.menuService
      .updateStatus(id, status)
      .subscribe((data) => console.log(data));
  }
  removeItem(id: string) {
    this.menuService.removeItems(id).subscribe(() => this.loadItems());
  }
  addItem() {
    this.menuService
      .addItems({
        id: v4(),
        type: <string>(<unknown>this.addItemForm.get('type')?.value),
        name: <string>this.addItemForm.get('name')?.value,
        summary: <string>this.addItemForm.get('summary')?.value,
        desciption: <string>this.addItemForm.get('description')?.value,
        price: <number>(<unknown>this.addItemForm.get('price')?.value),
        status: <boolean>(<unknown>this.addItemForm.get('status')?.value),
      })
      .subscribe(() => this.loadItems());
      this.addItemForm.reset({status:false})
  }
  editItem(item:MenuItem) {
    if(this.currentlyEditing?.id===item.id){
      this.editing=!this.editing;
    }
    else{
      this.editing=true;
    }
    this.currentlyEditing=item;

  }
  cancelUpdate(){
      this.editing=!this.editing;
   
  }
  updateItem() {
    this.menuService.updateItem({
      id:this.currentlyEditing?.id,
      type:<string><unknown>this.editForm.get("type")?.value,
      name:<string>this.editForm.get("name")?.value,
      summary:<string> this.editForm.get("summary")?.value,
      desciption:<string>this.editForm.get("description")?.value,
      price:<number> <unknown>this.editForm.get("price")?.value,
      status:<boolean><unknown>this.editForm.get("status")?.value 

    }).subscribe(()=>this.loadItems())
    this.editForm.reset({status:false});
    this.editing=false;
  }

  addItemForm = this.fb.group({
    type: [,Validators.required],
    name: ['',Validators.required],
    summary: ['',Validators.required],
    description: ['',Validators.required],
    price: [,Validators.required],
    status: [false,],
  });
  editForm = this.fb.group({
    type: [],
    name: [''],
    summary: [''],
    description: [''],
    price: [],
    status: [false,],
  });
  constructor(private menuService: AdminMenuService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadItems();
  }
}

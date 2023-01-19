import { Component, OnInit } from '@angular/core';
import { AdminService, Table } from '../services/admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as v4 } from 'uuid';

@Component({
  selector: 'app-table-managment',
  templateUrl: './table-managment.component.html',
  styleUrls: ['./table-managment.component.css'],
})
export class TableManagmentComponent implements OnInit {
  tables: Table[] = [];

  editing = false; //indicating if the user wants to edit the table
  currentlyEditing!: Table; //Currently chosen table for editing
  constructor(private adminService: AdminService, private fb: FormBuilder) {}
  tableAddForm = this.fb.group({
    number: [
      0,
      [Validators.required, Validators.min(1)],
      [this.adminService.tableAsyncValdidator()],
    ],
    capacity: [0, [Validators.required, Validators.min(1)]],
    type: [, Validators.required],
  });

  tableEditForm = this.fb.group({
    capacity: [1, Validators.required],
    type: [, Validators.required],
  });

  addTable() {
    this.adminService
      .addTable({
        id: v4(),
        number: <number>(<unknown>this.tableAddForm.get('number')?.value),
        capacity: <number>(<unknown>this.tableAddForm.get('capacity')?.value),
        type: <string>(<unknown>this.tableAddForm.get('type')?.value),
        bookedForDates: [],
      })
      .subscribe(() => this.loadTables());
    this.tableAddForm.reset();
  }
  removeTable(id: string) {
    this.adminService.removeTable(id).subscribe(() => this.loadTables());
  }
  loadTables() {
    //to update data anytime we need.
    this.adminService.getTables().subscribe((data) => (this.tables = data));
  }
  editTable(table: Table) {
    if (this.currentlyEditing?.id === table.id) {
      this.editing = !this.editing;
    } else {
      this.editing = true;
    }
    this.currentlyEditing = table;
    this.tableEditForm
      .get('capacity')
      ?.setValue(this.currentlyEditing.capacity);
  }
  updateTable() {
    this.adminService
      .editTable({
        id: this.currentlyEditing.id,
        number: this.currentlyEditing.number,
        capacity: <number>(<unknown>this.tableEditForm.get('capacity')?.value),
        type: <string>(<unknown>this.tableEditForm.get('type')?.value),
      })
      .subscribe(() => this.loadTables());
    this.editing = false;
    this.currentlyEditing = <Table>(<unknown>undefined);
    this.tableEditForm.reset({ capacity: 1 });
    //
  }
  ngOnInit(): void {
    this.loadTables(); //initially loading data
  }
}

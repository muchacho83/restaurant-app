import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  dbUrl = 'http://localhost:3000/tables';
  getTables() {
    return this.http.get<Table[]>(`${this.dbUrl}?_sort=number&_order=asc`);
  }
  addTable(table: Table) {
    return this.http.post(this.dbUrl, table);
  }
  removeTable(id: string) {
    return this.http.delete(`${this.dbUrl}/${id}`);
  }
  editTable(updatedTable: Table) {
    return this.http.put(`${this.dbUrl}/${updatedTable.id}`, updatedTable);
  }
  tableAsyncValdidator(): AsyncValidatorFn {
    //async validator for table form. Checking if the table number already exists in database.
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http
        .get(`${this.dbUrl}?number_like=${control.value}`)
        .pipe(
          map((result) =>
            JSON.stringify(result) === '[]' ? null : { exists: true }
          )
        );
    };
  }

  constructor(private http: HttpClient) {}
}
export interface Table {
  id: string;
  number: number;
  capacity: number;
  type: string,
  bookedForDates?:Array<string>
}

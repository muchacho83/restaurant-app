import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  dbUrl = '';

  login(loginCred: any) {
    this.dbUrl = 'http://localhost:3000/login';
    return this.http.post<accesToken>(this.dbUrl, {
      email: loginCred.username,
      password: loginCred.password,
    });
  }
  register(
    email: string,
    password: string,
    mobile: string,
    name: string,
    lastName: string
  ) {
    this.dbUrl = 'http://localhost:3000/register';
    return this.http.post(this.dbUrl, {
      email: email,
      password: password,
      mobile: mobile,
      name: name,
      lastName: lastName,
      bookings:[]
    });
  }
  constructor(private http: HttpClient) {}
}
interface accesToken {
  accessToken: string;
  user: {
    bookings:Array<string>,
    email: string;
    id: number;
    lastName: string;
    mobile: string;
    name: string;
  };
}

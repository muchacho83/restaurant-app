import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: [''],
    password: [''],
  });
  errMsg: string = '';
  login() {
    this.loginService.login(this.loginForm?.value).subscribe({
      next: (data) => {
        this.cookieService.set('key', data.accessToken);
        this.cookieService.set('id', <string>(<unknown>data.user.id));
        this.cookieService.set("name",data.user.name)
        this.cookieService.set("lastName",data.user.lastName)
        if(data.user.email==="admin@gmail.com"){
          this.cookieService.set("isAdmin","1")
          this.router.navigate(['/home/home-page/admin', 'table-managment']);
        }
        else{
          this.cookieService.set("isAdmin","0"),
          this.router.navigate(['/home/home-page/user', 'myBookings']);
          
        }
      },
      error: (err) => (this.errMsg = err.error),
    });
  }
  constructor(
    private fb: FormBuilder,
    private loginService: AuthenticationService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private cookieService:CookieService,private router:Router) { }

  ngOnInit(): void {
    // if(this.cookieService.check("key")){
    //   if(this.cookieService.get("isAdmin")==="1"){
    //     this.router.navigate(["home/home-page/admin","table-managment"])
    //   }
    // }
  }

}

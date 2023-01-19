import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  logout() {
    this.cookieService.deleteAll('/', 'localhost', false, 'Lax');
    
  this.router.navigate(['/', 'landing-page']).then(()=> window.location.reload())
  }

  name = '';
  lastName = '';
  isAdmin: boolean = false;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.name = this.cookieService.get('name');
    this.lastName = this.cookieService.get('lastName');
    if (this.cookieService.get('isAdmin') === '1') {
      this.isAdmin = true;
    }
  }
}

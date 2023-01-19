import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MenuManagmentComponent } from './admin/admin/menu-managment/menu-managment.component';
// import { TableManagmentComponent } from './admin/table-managment/table-managment.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { ErrorComponent } from './error/error.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './route-guards/auth-guard.guard';
import { LoginGuard } from './route-guards/login.guard';

const routes: Routes = [
  
  {
    path: 'home',
    loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule),
    canActivate:[AuthGuard],
    // canLoad:[AuthGuard]

  },
  {
    path: 'landing-page',
    component: LandingPageComponent,
    canActivate:[LoginGuard]

  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: '',
    redirectTo: '/landing-page',
    pathMatch: 'full',
  },
  {
    path:"**",
    component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

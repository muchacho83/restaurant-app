import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  errMsg = '';
  passMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const pass = control.get('pass');
    const repass = control.get('rePass');

    return pass && repass && pass.value === repass.value
      ? null
      : { noMatch: true };
  };
  registerForm = this.fb.group(
    {
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],

      pass: ['', Validators.required],
      rePass: ['', Validators.required],
    },
    { validators: this.passMatchValidator }
  );

  
  register() {
    this.authService
      .register(
        <string>this.registerForm.get('email')?.value,
        <string>this.registerForm.get('pass')?.value,
        <string>this.registerForm.get('tel')?.value,
        <string>this.registerForm.get('fName')?.value,
        <string>this.registerForm.get('lName')?.value
      )
      .subscribe({
        next: () => {
          this.errMsg = 'Succesfully Registered';
          setTimeout(()=>{this.router.navigate(["/landing-page"]);this.registerForm.reset()},2000 )
          
        },
        error: (err) => {
          this.errMsg = err.error;
        },
      });
  }
  ngOnInit(): void {
    this.registerForm.get("email")?.valueChanges.subscribe(()=>{
      this.errMsg='';
    })
  }
}

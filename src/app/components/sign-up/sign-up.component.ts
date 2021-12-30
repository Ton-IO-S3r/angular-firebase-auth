import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../services/auth.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null =>{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch : true
      }
    }
    return null;
  };
  
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  signupForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    {
      validators: passwordsMatchValidator()
    }
  );
  
  get name(){
    return this.signupForm.get('name')
  }
  get email(){
    return this.signupForm.get('email')
  }
  get password(){
    return this.signupForm.get('password')
  }
  get confirmPassword(){
    return this.signupForm.get('confirmPassword')
  }

  constructor(private authService: AuthService, 
              private router: Router,
              private toast: HotToastService) { }

  ngOnInit(): void {
  }

  submit = () => {
    if (!this.signupForm.valid) {
      return
    }
    const { name, email, password} = this.signupForm.value;
    this.authService.signup(name, email, password)
        .pipe(this.toast.observe({
          success: 'Signed up succesfully',
          loading: 'Signing up...',
          error: ({message}) => `${message}`
        }))
        .subscribe(()=>{
          this.router.navigate(['/home']);
        });
  }
}
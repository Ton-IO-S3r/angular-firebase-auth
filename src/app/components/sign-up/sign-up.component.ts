import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  get email(){
    return this.signupForm.get('email')
  }
  get password(){
    return this.signupForm.get('password')
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
    const { email, password} = this.signupForm.value;
    this.authService.signup(email, password)
        .pipe(this.toast.observe({
          success: 'Signed up succesfully',
          loading: 'Signing up...',
          error: 'There was an error'
        }))
        .subscribe(()=>{
          this.router.navigate(['/home']);
        });
  }
}
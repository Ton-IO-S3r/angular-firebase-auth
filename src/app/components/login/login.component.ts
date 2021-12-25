import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }

  constructor(private authService: AuthService, 
              private router: Router,
              private toast: HotToastService) { }

  ngOnInit(): void {
  }

  submit = () => {
    if (!this.loginForm.valid) {
      return
    }
    const { email, password} = this.loginForm.value;
    this.authService.login(email, password)
        .pipe(this.toast.observe({
          success: 'Logged in succesfully',
          loading: 'Logging in...',
          error: 'There was an error'
        }))
        .subscribe(()=>{
          this.router.navigate(['/home']);
        });
  }
}

import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  currentUser$ = authState(this.auth); 

  constructor(private auth: Auth) { }

  login = (username:string, password:string) =>{
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }
  logout = () => {
    return from(this.auth.signOut());
  }

  signup = (username:string, password:string) => {
    return from(createUserWithEmailAndPassword(this.auth, username, password))
  }
}

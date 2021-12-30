import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Functions } from '@angular/fire/functions';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { from, switchMap } from 'rxjs';

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

  signup = (name:string, email: string, password:string) => {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({user}) => updateProfile(user, {displayName: name}))
    )
  }
}

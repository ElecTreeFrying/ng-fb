import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
  }

  onSignin(option: string) {
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];

    // sign in to your account using email and password
    if (option === 'email') {
      this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    // sign in to your account using google account
    else if (option === 'google') {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.afAuth.auth.signInWithPopup(provider)
    }

    // sign in to your account using facebook account
    else if (option === 'facebook') {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider)
    }

    // sign in to your account using twitter account
    else if (option === 'twitter') {
      const provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth.signInWithPopup(provider)
    }

    // sign in to your account using github account
    else if (option === 'github') {
      const provider = new firebase.auth.GithubAuthProvider();
      this.afAuth.auth.signInWithPopup(provider)
    }

    // sign in to your account anonymously
    else if (option === 'anonymous') {
      this.afAuth.auth.signInAnonymously();
    } else throw new Error();

  }


}

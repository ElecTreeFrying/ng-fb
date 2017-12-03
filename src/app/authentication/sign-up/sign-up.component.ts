import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
  }

  onSignup(option: string) {
    const email = this.registerForm.value['email'];
    const password = this.registerForm.value['password'];

    // create email with username and password
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }

}

import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  onSignout() {
    // this will log out your account
    this.afAuth.auth.signOut()

    // auth state will be null when this runs
  }

}

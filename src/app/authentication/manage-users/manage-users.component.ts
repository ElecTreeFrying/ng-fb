import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  authState(): void {
    this.afAuth.authState.subscribe((auth) => {
      // if auth is not null you are signed in
      console.log(auth);

      // this will null on sign out
      // that would mean your logged out in your account
    });
  }

}

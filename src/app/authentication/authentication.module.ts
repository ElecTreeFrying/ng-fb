import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';

import { AuthenticationComponent } from './authentication.component';
import { OptionsComponent } from './options/options.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ],
  declarations: [
    AuthenticationComponent,
    ManageUsersComponent,
    SignInComponent,
    SignOutComponent,
    SignUpComponent,
    OptionsComponent
  ]
})
export class AuthenticationModule { }

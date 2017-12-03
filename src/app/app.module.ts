import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RealtimedbComponent } from './realtimedb/realtimedb.component';
import { StorageComponent } from './storage/storage.component';
import { HostingComponent } from './hosting/hosting.component';

// firebase imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// environment imports
import { environment } from '../environments/environment';
import { NoticeComponent } from './notice/notice.component';
const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    NoticeComponent,
    RealtimedbComponent,
    StorageComponent,
    HostingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // firebase imports
    // initialize app with environemt
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

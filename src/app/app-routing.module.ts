import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RealtimedbComponent } from './realtimedb/realtimedb.component';
import { StorageComponent } from './storage/storage.component';
import { HostingComponent } from './hosting/hosting.component';

const routes: Routes = [
  { path: 'authentication', loadChildren: './authentication/authentication.module#AuthenticationModule' },
  { path: 'realtimedb', component: RealtimedbComponent },
  { path: 'storage', component: StorageComponent },
  { path: 'hosting', component: HostingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', loadChildren: 'app/signup/signup.module#SignupModule' },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: 'event', loadChildren: 'app/event/event.module#EventModule' },
  { path: 'events', loadChildren: 'app/events-list/events-list.module#EventsListModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

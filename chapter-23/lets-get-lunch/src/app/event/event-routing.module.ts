import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth/auth.guard';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventViewComponent } from './event-view/event-view.component';
import { EventUpdateComponent } from './event-update/event-update.component';
import { EventGuard } from '../guards/event/event.guard';

const routes: Routes = [
  { path: '', component: EventCreateComponent, canActivate: [AuthGuard] },
  { path: ':id', component: EventViewComponent, canActivate: [AuthGuard] },
  { path: ':id/update', component: EventUpdateComponent, canActivate: [EventGuard, AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EventGuard]
})
export class EventRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CalendarModule } from 'angular-calendar';
import { DashboardComponent } from './dashboard.component';
import { EventsService } from '../services/events/events.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CalendarModule.forRoot()
  ],
  declarations: [DashboardComponent],
  providers: [EventsService]
})
export class DashboardModule { }

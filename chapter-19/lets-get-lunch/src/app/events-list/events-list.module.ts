import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsListRoutingModule } from './events-list-routing.module';
import { EventsListComponent } from './events-list.component';
import { EventsService } from '../services/events/events.service';

@NgModule({
  imports: [
    CommonModule,
    EventsListRoutingModule
  ],
  declarations: [EventsListComponent],
  providers: [EventsService]
})
export class EventsListModule { }

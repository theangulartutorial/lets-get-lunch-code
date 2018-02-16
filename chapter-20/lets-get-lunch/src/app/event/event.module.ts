import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { EventRoutingModule } from './event-routing.module';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventsService } from '../services/events/events.service';
import { EventViewComponent } from './event-view/event-view.component';
import { CommentCreateModule } from '../comment-create/comment-create.module';
import { MemberListModule } from '../member-list/member-list.module';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommentCreateModule,
    MemberListModule
  ],
  declarations: [EventCreateComponent, EventViewComponent],
  providers: [EventsService]
})
export class EventModule { }

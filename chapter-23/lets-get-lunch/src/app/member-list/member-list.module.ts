import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list.component';
import { EventsService } from '../services/events/events.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MemberListComponent],
  exports: [MemberListComponent],
  providers: [EventsService]
})
export class MemberListModule { }

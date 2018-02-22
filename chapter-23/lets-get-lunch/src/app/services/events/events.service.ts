import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './event';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { format } from 'date-fns';
import { environment } from '../../../environments/environment';

@Injectable()
export class EventsService {
  API = environment.api;

  constructor(private http: HttpClient, private authService: AuthService) { }

  create(event: Event): Observable<Event> {
    return this.http.post<Event>(this.API + '/events', event);
  }

  get(id: string): Observable<Event> {
    return this.http.get<Event>(this.API + '/events/' + id)
      .map((res: Event) => this.formatDateTime(res));
  }

  getUserEvents(userId: string): Observable<Event[]> {
    return this.http.get<Event[]>(this.API + '/events/user/' + userId);
  }

  all(): Observable<Event[]> {
    return this.http.get<Event[]>(this.API + '/events');
  }

  update(event: Event): Observable<Event> {
    return this.http.patch<Event>(this.API + '/events/' + event._id, event);
  }

  subscribe(eventId: string, user: object): Observable<Event> {
    return this.http.patch<Event>(this.API + '/events/' + eventId + '/subscribe', user);
  }

  isEventCreator(creatorId: string): boolean {
    const user = this.authService.currentUser();
    return user._id === creatorId ? true : false;
  }

  formatDateTime(event: Event): Event {
    event.displayStart = format(event.startTime, 'dddd MMM, Do - h:mm A');
    event.displayEnd = format(event.endTime, 'dddd MMM, Do - h:mm A');
    return event;
  }

}

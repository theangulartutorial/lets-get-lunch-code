import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './event';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventsService {

  constructor(private http: HttpClient) { }

  create(event: Event): Observable<Event> {
    return this.http.post<Event>('http://localhost:8080/api/events', event);
  }

}

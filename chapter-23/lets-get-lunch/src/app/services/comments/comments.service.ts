import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Comment } from './comment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentsService {
  API = environment.api;

  constructor(private http: HttpClient) { }

  create(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.API + '/comments', comment);
  }

  getEventComments(eventId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.API + '/comments/event/' + eventId);
  }

}

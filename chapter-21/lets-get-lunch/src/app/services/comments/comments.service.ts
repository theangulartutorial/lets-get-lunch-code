import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Comment } from './comment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentsService {

  constructor(private http: HttpClient) { }

  create(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>('http://localhost:8080/api/comments', comment);
  }

  getEventComments(eventId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:8080/api/comments/event/' + eventId);
  }

}

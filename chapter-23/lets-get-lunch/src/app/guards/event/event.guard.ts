import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EventsService } from '../../services/events/events.service';

@Injectable()
export class EventGuard implements CanActivate {
  constructor(private eventsService: EventsService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const eventId = next.params.id;
    return this.eventsService.get(eventId).map(res => {
      if (this.eventsService.isEventCreator(res._creator)) {
        return true;
      } else {
        this.router.navigateByUrl('/events');
        return false;
      }
    });
  }
}

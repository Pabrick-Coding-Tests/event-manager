import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockEventList } from '../../../assets/mock/events';
import { EventItem } from '../../models/event-item.interface';

@Injectable({
  providedIn: 'root'
})
export class EventStorageService {

  constructor() {}

  getEventList$(): Observable<EventItem[]> {
    return of(mockEventList);
  }
}

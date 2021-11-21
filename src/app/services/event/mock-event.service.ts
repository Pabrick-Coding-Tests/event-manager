import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { MOCK_EVENT_LIST } from "../../../assets/mock/event-list.mock";
import { EventItem } from "../../models/event-item.interface";

@Injectable({
  providedIn: "root"
})
export class MockEventService {

  public upcomingEventList$ = of(MOCK_EVENT_LIST).pipe(
    map((eventList: EventItem[]) => [eventList[1]])
  );
  public pastEventList$ = of(MOCK_EVENT_LIST).pipe(
    map((eventList: EventItem[]) => [eventList[0]])
  );

  public getEvent$(id: string): Observable<EventItem> {
    return of(MOCK_EVENT_LIST).pipe(
      map((list: EventItem[])=> list.find((event: EventItem) => event.id === id) as EventItem)
    );
  }
}

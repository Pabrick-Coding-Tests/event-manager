import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MOCK_EVENT_LIST } from "../../../assets/mock/event-list.mock";
import { EventItem } from "../../models/event-item.interface";

@Injectable({
  providedIn: "root"
})
export class MockEventService2 {
  public getEvent$(id: string): Observable<EventItem> {
    return of(MOCK_EVENT_LIST[0]);
  }
}

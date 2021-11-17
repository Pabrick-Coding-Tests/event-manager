import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { EventItem } from "../../models/event-item.interface";
import { StorageService } from "../storage/storage.service";

@Injectable({
  providedIn: "root"
})
export class EventService {

  public upcomingEventList$: Observable<EventItem[]>;
  public pastEventList$: Observable<EventItem[]>;

  constructor(
    private _storageSrv: StorageService
  ) {
    this.upcomingEventList$ = this._storageSrv.list$.pipe(
      map((eventList: EventItem[]) =>
        eventList.filter((event: EventItem)=> this.isAfterToday(event))
      )
    );
    this.pastEventList$ = this._storageSrv.list$.pipe(
      map((eventList: EventItem[]) =>
        eventList.filter((event: EventItem)=> !this.isAfterToday(event))
      )
    );
  }

  public getEvent$(id: string): Observable<EventItem> {
    return this._storageSrv.list$.pipe(
      map((list: EventItem[])=> list.find((event: EventItem) => event.id === id) as EventItem)
    );
  }

  public isAfterToday(event: EventItem): boolean {
    const todayWithoutTime = new Date(Date.now()).toISOString().split("T")[0];
    const currentDate = new Date(todayWithoutTime);
    const eventDate = new Date(event.date);
    return eventDate >= currentDate;
  }
}

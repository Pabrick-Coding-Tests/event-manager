import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { EventItem } from "../../models/event-item.interface";
import { DateService } from "../date/date.service";
import { StorageService } from "../storage/storage.service";

@Injectable({
  providedIn: "root"
})
export class EventService {

  public upcomingEventList$: Observable<EventItem[]>;
  public pastEventList$: Observable<EventItem[]>;

  constructor(
    private _dateSrv: DateService,
    private _storageSrv: StorageService
  ) {
    this.upcomingEventList$ = this._storageSrv.list$.pipe(
      map((eventList: EventItem[]) =>
        eventList.filter((event: EventItem)=> !this.isBeforeToday(event))
      )
    );
    this.pastEventList$ = this._storageSrv.list$.pipe(
      map((eventList: EventItem[]) =>
        eventList.filter((event: EventItem)=> this.isBeforeToday(event))
      )
    );
  }

  public getEvent$(id: string): Observable<EventItem> {
    return this._storageSrv.list$.pipe(
      map((list: EventItem[])=> list.find((event: EventItem) => event.id === id) as EventItem)
    );
  }

  public isBeforeToday(event: EventItem): boolean {
    const parsedToday = this._dateSrv.today;
    const currentDate = new Date(parsedToday.year(), parseInt(parsedToday.month(), 10), parseInt(parsedToday.day(), 10));
    const parsedDate = this._dateSrv.parseDate(event.date);
    const eventDate = new Date(parseInt(parsedDate.year, 10), parseInt(parsedDate.month, 10), parseInt(parsedDate.day, 10));
    return eventDate < currentDate;
  }
}

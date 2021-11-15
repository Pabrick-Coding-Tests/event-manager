import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { EventStorageService } from "../../services/storage/event-storage.service";
import { EventItem } from "../../models/event-item.interface";

@Component({
  selector: "event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements OnInit {

  public eventIdSelected$: Observable<string | null>;
  public upcomingEventList$: Observable<EventItem[] | null>;
  public pastEventList$: Observable<EventItem[] | null>;

  constructor(
    public readonly route: ActivatedRoute,
    public readonly router: Router,
    private readonly _eventStorageSrv: EventStorageService
  ) {
    this.eventIdSelected$ = this.route.queryParams.pipe(
      map((params: Params) => params["id"])
    );
    this.upcomingEventList$ = this._eventStorageSrv.getEventList$().pipe(
      map((eventList: EventItem[]) => {
        return eventList; // Add filter logic here
      })
    );
    this.pastEventList$ = this._eventStorageSrv.getEventList$().pipe(
      map((eventList: EventItem[]) => {
        return eventList; // Add filter logic here
      })
    )
  }

  ngOnInit(): void {}

  public createNewEvent(): void {
    this.router.navigate(["./form"]);
  }

  public onUpdateEvent(event: EventItem): void {
    console.log("onUpdateEvent", event);
    this.router.navigate(["./form"], { queryParams: { "id": event.id }});
  }

  public onDeleteEvent(event: EventItem): void {
    console.log("onDeleteEvent", event);
  }

}

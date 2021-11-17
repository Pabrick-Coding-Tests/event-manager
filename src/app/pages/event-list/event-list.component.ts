import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { StorageService } from "../../services/storage/storage.service";
import { EventItem } from "../../models/event-item.interface";
import { EventService } from "../../services/event/event.service";

@Component({
  selector: "event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements OnInit {

  public eventIdSelected$: Observable<string>;
  public upcomingEventList$: Observable<EventItem[]>;
  public pastEventList$: Observable<EventItem[]>;

  constructor(
    public readonly route: ActivatedRoute,
    public readonly router: Router,
    private readonly _eventSrv: EventService,
    private readonly _storageSrv: StorageService
  ) {
    this.upcomingEventList$ = this._eventSrv.upcomingEventList$;
    this.pastEventList$ = this._eventSrv.pastEventList$;
    this.eventIdSelected$ = this.route.queryParams.pipe(
      map((params: Params) => params["id"])
    );
  }

  ngOnInit(): void {}

  public createNewEvent(): void {
    this.router.navigate(["./form"]);
  }

  public onUpdateEvent(event: EventItem): void {
    this.router.navigate(["./form"], { queryParams: { "id": event.id }});
  }

  public onDeleteEvent(event: EventItem): void {
    this._storageSrv.remove(event);
    this.router.navigate(["./list"]);
  }

}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { map, Observable, switchMap, tap } from "rxjs";
import { StorageService } from "../../services/storage/storage.service";
import { DateService } from "../../services/date/date.service";
import { EventService } from "../../services/event/event.service";
import { EventItem } from "src/app/models/event-item.interface";

@Component({
  selector: "event-form",
  templateUrl: "./event-form.component.html",
  styleUrls: ["./event-form.component.scss"]
})
export class EventFormComponent implements OnInit {

  public eventSelected$: Observable<EventItem>;
  public eventForm$: Observable<FormGroup>;

  constructor(
    public readonly route: ActivatedRoute,
    public readonly router: Router,
    private readonly _dateSrv: DateService,
    private readonly _eventSrv: EventService,
    private readonly _storageSrv: StorageService
  ) {
    this.eventSelected$ = this.route.queryParams.pipe(
      map((params: Params) => params["id"]),
      map((idSelected: string) => idSelected),
      switchMap((idSelected: string) => {
        return this._eventSrv.getEvent$(idSelected)
      })
    );

    this.eventForm$ = this.eventSelected$.pipe(
      map((eventSelected: EventItem) => {
        if(eventSelected) {
          const eventSelectedDate = this._dateSrv.parseDate(eventSelected.date);
          return new FormGroup({
            title: new FormControl(eventSelected.title),
            description: new FormControl(eventSelected.description),
            day: new FormControl(eventSelectedDate.day),
            month: new FormControl(eventSelectedDate.month),
            year: new FormControl(eventSelectedDate.year),
          });
        }

        return new FormGroup({
          title: new FormControl(""),
          description: new FormControl(""),
          day: new FormControl(this._dateSrv.today.day()),
          month: new FormControl(this._dateSrv.today.month()),
          year: new FormControl(this._dateSrv.today.year()),
        });
      })
    );
  }

  ngOnInit() {}

  public onCreate(form: FormGroup) {
    console.log("onCreate", form);
    console.log("Valid?", form.valid); // true or false
    console.log("Title", form.value.title);
    console.log("Description", form.value.description);

    const newEvent = {
      id: Date.now().toString(),
      title: form.value.title,
      description: form.value.description,
      date: `${form.value.day}/${form.value.month}/${form.value.year}`,
      weatherIcon: ""
    }
    this._storageSrv.add(newEvent);
    this.router.navigate(["./list"], { queryParams: { "id": newEvent.id }});
  }

  public onUpdate(form: FormGroup) {
    console.log("onUpdate", form);
    console.log("Valid?", form.valid); // true or false
    console.log("Title", form.value.title);
    console.log("Description", form.value.description);
  }

  public back() {
    this.router.navigate(["./list"], { queryParamsHandling: "preserve" });
  }
}

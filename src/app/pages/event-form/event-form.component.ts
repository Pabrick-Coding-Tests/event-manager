import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { combineLatest, map, Observable, switchMap, take, tap, throwError } from "rxjs";
import { StorageService } from "../../services/storage/storage.service";
import { EventService } from "../../services/event/event.service";
import { EventItem } from "../../models/event-item.interface";
import { WeatherService } from "../../services/weather/weather.service";

@Component({
  selector: "event-form",
  templateUrl: "./event-form.component.html",
  styleUrls: ["./event-form.component.scss"]
})
export class EventFormComponent implements OnInit {

  public eventIdSelected$: Observable<string>;
  public eventSelected$: Observable<EventItem>;
  public eventForm$: Observable<FormGroup>;
  public isUpdate: boolean;

  constructor(
    public readonly route: ActivatedRoute,
    public readonly router: Router,
    private _formBuilder: FormBuilder,
    private readonly _eventSrv: EventService,
    private readonly _storageSrv: StorageService,
    private readonly _weatherSrv: WeatherService,
  ) {
    this.isUpdate = false;

    this.eventIdSelected$ = this.route.queryParams.pipe(
      map((params: Params) => params["id"])
    );

    this.eventSelected$ = this.eventIdSelected$.pipe(
      map((idSelected: string) => idSelected),
      switchMap((idSelected: string) => this._eventSrv.getEvent$(idSelected)),
      tap((idSelected) => {
        this.isUpdate = !!idSelected ?? false;
      })
    );

    this.eventForm$ = this.eventSelected$.pipe(
      map((eventSelected: EventItem) => {
        const todayWithoutTime = new Date(Date.now()).toISOString().split("T")[0];
        const formGroup = eventSelected ?? {
          title: "",
          description: "",
          date: todayWithoutTime
        }

        return this._formBuilder.group({
          title: [formGroup.title, Validators.required],
          description: [formGroup.description, Validators.required],
          date: [formGroup.date, [Validators.required, this.ValidateDate]]
        });
      })
    );
  }

  ngOnInit() {}

  public back() {
    this.router.navigate(["./list"], { queryParamsHandling: "preserve" });
  }

  public isInvalid(form: FormGroup, input: string) {
    return (form.get(input)?.invalid && (form.get(input)?.dirty || form.get(input)?.touched))
  }

  public onCreate(form: FormGroup) {
    this._weatherSrv.getThisDayWeather$(form.value.date)
      .pipe(take(1))
      .subscribe((weatherIcon) => {
        const newEvent = {
          id: Date.now().toString(),
          title: form.value.title,
          description: form.value.description,
          date: this.formatDate(form.value.date),
          weatherIcon: weatherIcon
        };
        this._storageSrv.add(newEvent);
        this.router.navigate(["./list"], { queryParams: { "id": newEvent.id }});
      });
  }

  public onUpdate(form: FormGroup) {
    combineLatest([
      this.eventSelected$,
      this._weatherSrv.getThisDayWeather$(form.value.date)
    ])
      .pipe(take(1))
      .subscribe(([eventSelected, weatherIcon]) => {
        const newEvent = {
          ...eventSelected,
          title: form.value.title,
          description: form.value.description,
          date: form.value.date,
          weatherIcon: weatherIcon
        };
        this._storageSrv.update(newEvent);
        this.router.navigate(["./list"], { queryParams: { "id": newEvent.id }});
      });
  }

  private formatDate(date: string) {
    return new Date(date).toISOString().split("T")[0];
  }

  private ValidateDate(control: AbstractControl) {
    const datePattern = /^\d{4}-\d{1,2}-\d{1,2}$/;
    const isValidDate = new Date(control.value).toString() !== "Invalid Date";
    if(!new RegExp(datePattern).test(control.value) || !isValidDate) {
      return {
        inValidDate: true
      };
    }
    return null;
  }
}

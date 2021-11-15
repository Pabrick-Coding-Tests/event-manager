import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map, Observable } from "rxjs";

@Component({
  selector: "event-form",
  templateUrl: "./event-form.component.html",
  styleUrls: ["./event-form.component.scss"]
})
export class EventFormComponent implements OnInit {

  public eventId$: Observable<string | null>;

  constructor(
    public readonly route: ActivatedRoute,
    public readonly router: Router
  ) {
    this.eventId$ = this.route.queryParams.pipe(
      map((params: Params) => params["id"])
    );
  }

  ngOnInit(): void {
  }

  public back() {
    this.router.navigate(["./list"], { queryParamsHandling: "preserve" });
  }

}

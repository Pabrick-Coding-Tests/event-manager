import { ComponentFixture, fakeAsync, inject, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { EventService } from "src/app/services/event/event.service";
import { MockEventService } from "src/app/services/event/mock-event.service";
import { MockEventService2 } from "src/app/services/event/mock-event2.service";
import { MockWeatherService } from "src/app/services/weather/mock-weather.service";
import { WeatherService } from "src/app/services/weather/weather.service";
import { MockActivatedRoute } from "./activated-route.mock";
import { EventFormComponent } from "./event-form.component";

describe("Page: EventForm", () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  describe("when no ID found in route", () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RouterTestingModule, ReactiveFormsModule],
        declarations: [EventFormComponent],
        providers: [
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: EventService, useClass: MockEventService },
          { provide: WeatherService, useClass: MockWeatherService }
        ],
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(EventFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should render", () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector("span")?.textContent).toContain("Back to my events");
    });

    it("should navigate to list when click BACK button", inject([Router], (router: Router) => {
      spyOn(router, 'navigate').and.stub();
      fixture.debugElement.nativeElement.querySelector("#btn-back").click();
      expect(router.navigate).toHaveBeenCalledWith(['./list'], { queryParamsHandling: "preserve" });
    }));

    // describe("when no ID found in route", () => {
      it("should show an empty form", () => {
        const inputTitle = fixture.debugElement.nativeElement.querySelector("#form-title");
        const inputDescription = fixture.debugElement.nativeElement.querySelector("#form-description");
        const inputDate = fixture.debugElement.nativeElement.querySelector("#form-date");
        expect(inputTitle.value).toBe("");
        expect(inputDescription.value).toBe("");
        expect(inputDate.value).toBe(new Date(Date.now()).toISOString().split("T")[0]);
      });
      it("should show CREATE button", () => {
        const button = fixture.debugElement.nativeElement.querySelector("#btn-submit");
        expect(button?.textContent).toContain("Create");
      });
    // });
  });

  describe("when ID found in route", () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RouterTestingModule, ReactiveFormsModule],
        declarations: [EventFormComponent],
        providers: [
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: EventService, useClass: MockEventService2 },
          { provide: WeatherService, useClass: MockWeatherService }
        ],
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(EventFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should fill form with event data", fakeAsync(() => {
      const inputTitle = fixture.debugElement.nativeElement.querySelector("#form-title");
      const inputDescription = fixture.debugElement.nativeElement.querySelector("#form-description");
      const inputDate = fixture.debugElement.nativeElement.querySelector("#form-date");
      expect(inputTitle.value).toBe("mock1");
      expect(inputDescription.value).toBe("lorem ipsum 1");
      expect(inputDate.value).toBe("1900-11-15");
    }));
    it("should show UPDATE button", () => {
      const button = fixture.debugElement.nativeElement.querySelector("#btn-submit");
      expect(button?.textContent).toContain("Update");
    });
  });
});

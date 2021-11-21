import { ComponentFixture, fakeAsync, inject, TestBed, tick } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { CardEventComponent } from "src/app/components/card-event/card-event.component";
import { EventItem } from "src/app/models/event-item.interface";
import { EventService } from "src/app/services/event/event.service";
import { MockEventService } from "src/app/services/event/mock-event.service";
import { EventListComponent } from "./event-list.component";

describe("Page: EventList", () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EventListComponent, CardEventComponent],
      providers: [
        { provide: EventService, useClass: MockEventService }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render title", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".page-list__title")?.textContent).toContain("My events");
  });

  describe("on upcoming events:", () => {
    it("should load list", () => {
      component.upcomingEventList$.subscribe((upcomingEventList: EventItem[])=> {
        expect(upcomingEventList[0].title).toEqual("mock2");
      });
    });

    it("should render events", () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector("#upcoming-events")?.textContent).not.toContain("mock1");
      expect(compiled.querySelector("#upcoming-events")?.textContent).toContain("mock2");
    });

    it("should render 'No events to show' if EMPTY", () => {
      component.upcomingEventList$ = of([]);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector("#upcoming-events")?.textContent).toContain("No events to show");
      expect(compiled.querySelector("#upcoming-events")?.textContent).not.toContain("mock2");
    });
  });

  describe("on past event:", () => {
    it("should load list", () => {
      component.pastEventList$.subscribe((pastEventList: EventItem[])=> {
        expect(pastEventList[0].title).toEqual("mock1");
      });
    });

    it("should render events", () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector("#past-events")?.textContent).toContain("mock1");
      expect(compiled.querySelector("#past-events")?.textContent).not.toContain("mock2");
    });

    it("should render 'No events to show' if EMPTY", () => {
      component.pastEventList$ = of([]);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector("#past-events")?.textContent).toContain("No events to show");
      expect(compiled.querySelector("#past-events")?.textContent).not.toContain("mock1");
    });
  });

  it("should open event if ID found in route", () => {
    component.eventIdSelected$ = of("1");
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("#past-events")?.querySelector("details")?.hasAttribute("open")).toBeTrue();
  });

  it("should navigate to form when click CREATE button", inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    fixture.debugElement.nativeElement.querySelector("#btn-create").click();
    expect(router.navigate).toHaveBeenCalledWith(['./form']);
  }));
});

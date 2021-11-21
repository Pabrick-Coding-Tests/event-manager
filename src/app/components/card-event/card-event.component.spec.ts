import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { EventItem } from "src/app/models/event-item.interface";
import { CardEventComponent } from "./card-event.component";

describe("Component: CardEvent", () => {
  let component: CardEventComponent;
  let fixture: ComponentFixture<CardEventComponent>;
  let itemMock: EventItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardEventComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    itemMock = {
      id: "0001",
      title: "test title",
      description: "test description",
      date: "1983-07-26",
      weatherIcon: "fog"
    };
    fixture = TestBed.createComponent(CardEventComponent);
    component = fixture.componentInstance;
    component.item = itemMock;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("should render", () => {
    let compiled: HTMLElement;

    beforeEach(() => {
      compiled = fixture.nativeElement as HTMLElement;
    });

    it("title", () => {
      expect(compiled.querySelector("#title")?.textContent).toContain("test title");
    });

    it("description", () => {
      expect(compiled.querySelector("#description")?.textContent).toContain("test description");
    });

    it("weather", () => {
      expect(compiled.querySelector("#weather")?.textContent).toContain("fog");
    });

    it("date", () => {
      expect(compiled.querySelector("#date-month")?.textContent).toContain("jul");
      expect(compiled.querySelector("#date-day")?.textContent).toContain("26");
    });
  });

  describe("when @Input opened", () => {
    let compiled: HTMLElement;

    beforeEach(() => {
      compiled = fixture.nativeElement as HTMLElement;
    });

    it("is TRUE should be opened", () => {
      component.opened = true;
      fixture.detectChanges();
      expect(compiled.querySelector("#card")?.hasAttribute("open")).toBeTrue();
    });

    it("is FALSE should be closed", () => {
      component.opened = false;
      fixture.detectChanges();
      expect(compiled.querySelector("#card")?.hasAttribute("open")).toBeFalse();
    });
  });

  describe("when click", () => {
    it("update should emit", fakeAsync(() => {
      spyOn(component.updateEmt, "emit");
      const button = fixture.debugElement.nativeElement.querySelector("#btn-update");
      button.click();
      expect(component.updateEmt.emit).toHaveBeenCalledWith(true);
    }));

    it("delete should emit", fakeAsync(() => {
      spyOn(component.deleteEmt, "emit");
      const button = fixture.debugElement.nativeElement.querySelector("#btn-delete");
      button.click();
      expect(component.deleteEmt.emit).toHaveBeenCalledWith(true);
    }));
  });
});

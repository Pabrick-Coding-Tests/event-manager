import { TestBed } from "@angular/core/testing";
import { MOCK_EVENT_LIST } from "../../../assets/mock/event-list.mock";
import { StorageService } from "./storage.service";

describe("Service: EventStorage", () => {
  let service: StorageService;
  let localStoreMock= {} as any;
  localStoreMock["event-list"] = JSON.stringify(MOCK_EVENT_LIST);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);

    spyOn(window.localStorage, "getItem").and.callFake((key) =>
      key in localStoreMock ? localStoreMock[key] : null
    );
    spyOn(window.localStorage, "setItem").and.callFake(
      (key, value) => (localStoreMock[key] = value + "")
    );
    spyOn(window.localStorage, "clear").and.callFake(() => (localStoreMock = {}));
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  // it("should get the list events", fakeAsync(() => {
  //   service.list$.subscribe((list: EventItem[])=> {
  //     console.log("list", list);
  //     expect(list[0].title).toEqual("title1");
  //   });
  // }));
});

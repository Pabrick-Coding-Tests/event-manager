import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { WeatherService } from "./weather.service";

describe("Service: WeatherService", () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(WeatherService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});

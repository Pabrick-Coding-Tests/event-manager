import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { WEATHER_RESPONSE_MOCK } from "src/assets/mock/weather-response.mock.";

@Injectable({
  providedIn: "root"
})
export class MockWeatherService {

  public getWeather$(lat: number, lon: number): Observable<any> {
    return of(WEATHER_RESPONSE_MOCK);
  }

  public getThisDayWeather$(date: string): Observable<string> {
    return of("fog");
  }
}

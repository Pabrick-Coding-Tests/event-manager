import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import weatherMap from "../../utils/weather-icons";

@Injectable({
  providedIn: "root"
})
export class WeatherService {

  constructor(private _http: HttpClient) {}

  public getWeather$(lat: number, lon: number): Observable<any> {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
    return this._http.get<any>(url);
  }

  // This method is just an extreme simplification on the logic behind the weather API
  // the date passed as paremeter is added to current time hour, so that way will find
  // at least a result if is today's hour
  // ALSO the latitude and longitude is hardcode as an example
  // in other escenarios we could have or get mapped citys with their coordenates
  // or even better use the device location
  public getThisDayWeather$(date: string): Observable<string> {
    return this.getWeather$(60.10, 9.58).pipe(map((forecast: any) => {
      const currentDate = this.getDateWithCurrentHour(date);
      const dayFound = forecast.properties.timeseries.find((timeserie: any) => timeserie.time === currentDate);
      const icon = dayFound?.data?.next_1_hours?.summary?.symbol_code;
      return weatherMap.has(icon) ? weatherMap.get(icon) : weatherMap.get("not_found");
    }));
  }

  // This method format our current date to match
  //  with the one returned by the weather API
  private getDateWithCurrentHour(date: string) {
    const currentHour = new Date(Date.now()).getHours();
    return new Date(new Date(date).setHours(currentHour)).toISOString().replace(/\.\d+/, "");
  }
}

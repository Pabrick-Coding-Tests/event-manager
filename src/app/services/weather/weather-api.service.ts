import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WeatherApiService {

  constructor(private _http: HttpClient) {}

  public getWeather(lat: number, lon: number): Observable<any> {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.10&lon=9.58`;
    return this._http.get<any>(url);
  }
}

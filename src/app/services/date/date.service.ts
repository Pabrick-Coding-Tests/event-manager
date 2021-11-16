import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public today = {
    day: () => new Date().getDate().toString().padStart(2, "0"),
    month: () => (new Date().getMonth() + 1).toString().padStart(2, "0"),
    year: () => new Date().getFullYear(),
  };

  public parseDate(date: string): { day: string, month: string, year: string } {
    const splitted = date.split("/");
    return {
      day: splitted[0],
      month: splitted[1],
      year: splitted[2],
    };
  }

  public stringfyDate(date: { day: string, month: string, year: string }): string {
    return `${date.day}/${date.month}/${date.year}`;
  }

  public getDay(date: string): string {
    return date.split("/")[0];
  }

  public getMonth(date: string): string {
    return date.split("/")[1];
  }

  public getYear(date: string): string {
    return date.split("/")[2];
  }
}

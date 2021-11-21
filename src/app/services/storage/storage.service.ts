import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { EventItem } from "../../models/event-item.interface";

@Injectable({
  providedIn: "root"
})
export class StorageService {

  public list$: Observable<EventItem[]>;
  private readonly listSubject: BehaviorSubject<EventItem[]>;

  constructor() {
    this.listSubject = new BehaviorSubject<EventItem[]>([]);
    this.list$ = this.listSubject.asObservable();
    this.saveList(this.getLocalList());
  }

  public add(event: EventItem) {
    const list = this.listSubject.value;
    list.push(event);
    this.saveList(list);
  }

  public update(event: EventItem) {
    const newList = this.listSubject.value.map((item: EventItem)=> {
      if(item.id !== event.id) {
        return item;
      }

      return event;
    });
    this.saveList(newList);
  }

  public remove(event: EventItem) {
    const newList = this.listSubject.value.filter((item: EventItem)=> item.id !== event.id) ?? [];
    this.saveList(newList);
  }

  public saveList(list: EventItem[]) {
    localStorage.setItem("event-list", JSON.stringify(list));
    this.listSubject.next(list);
  }

  public getLocalList(): EventItem[] {
    return JSON.parse(localStorage.getItem("event-list") as string) ?? [];
  }
}

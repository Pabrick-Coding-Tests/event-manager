import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, take } from "rxjs";
import { mockEventList } from "../../../assets/mock/events";
import { EventItem } from "../../models/event-item.interface";

@Injectable({
  providedIn: "root"
})
export class StorageService {

  public mockList$ = of(mockEventList);
  public list$: Observable<EventItem[]>;
  private readonly listSubject: BehaviorSubject<EventItem[]>;

  constructor() {
    this.listSubject = new BehaviorSubject<EventItem[]>([]);
    this.list$ = this.listSubject.asObservable();

    const initialList = this.retrieveList();
    this.saveList(initialList);
  }

  public add(event: EventItem) {
    this.list$.pipe(take(1)).subscribe((list: EventItem[])=> {
      list.push(event);
      this.saveList(list);
    });
  }

  public remove(event: EventItem) {
    this.list$.pipe(take(1)).subscribe((list: EventItem[])=> {
      const newList = list.filter((item: EventItem)=> item.id !== event.id) ?? [];
      this.saveList(newList);
    });
  }

  private saveList(list: EventItem[]) {
    localStorage.setItem("event-list", JSON.stringify(list));
    this.listSubject.next(list);
  }

  private retrieveList(): EventItem[] {
    return JSON.parse(localStorage.getItem("event-list") as string) ?? [];
  }
}

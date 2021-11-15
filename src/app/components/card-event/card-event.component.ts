import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { EventItem } from "./../../models/event-item.interface";

@Component({
  selector: "card-event",
  templateUrl: "./card-event.component.html",
  styleUrls: ["./card-event.component.scss"]
})
export class CardEventComponent implements OnInit {

  @Input() item?: EventItem;
  @Input() opened?: boolean;
  @Output() updateEmt: EventEmitter<boolean> = new EventEmitter();
  @Output() deleteEmt: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public updateItem(): void {
    this.updateEmt.emit(true);
  }

  public deleteItem(): void {
    this.deleteEmt.emit(true);
  }
}

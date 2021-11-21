import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { EventItem } from "./../../models/event-item.interface";
import { MONTH_NAMES } from "./utils/month-names.const";

@Component({
  selector: "card-event",
  templateUrl: "./card-event.component.html",
  styleUrls: ["./card-event.component.scss"]
})
export class CardEventComponent implements OnInit {
  @Input() item!: EventItem;
  @Input() opened!: boolean;
  @Output() updateEmt: EventEmitter<boolean> = new EventEmitter();
  @Output() deleteEmt: EventEmitter<boolean> = new EventEmitter();

  public day?: string;
  public month?: string;

  ngOnInit(): void {
    const splittedDate = this.item?.date.split("-");
    const monthNumber = splittedDate ? parseInt(splittedDate[1], 10) : 0;
    this.day = splittedDate ? splittedDate[2] : "XX";
    this.month = MONTH_NAMES[monthNumber];
  }

  public updateItem(): void {
    this.updateEmt.emit(true);
  }

  public deleteItem(): void {
    this.deleteEmt.emit(true);
  }
}

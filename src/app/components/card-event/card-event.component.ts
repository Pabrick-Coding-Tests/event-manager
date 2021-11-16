import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { EventItem } from "./../../models/event-item.interface";

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
    const splittedDate = this.item.date.split("/");
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const monthNumber = parseInt(splittedDate[1], 10);
    this.day = splittedDate[0];
    this.month = monthNames[monthNumber];
  }

  public updateItem(): void {
    this.updateEmt.emit(true);
  }

  public deleteItem(): void {
    this.deleteEmt.emit(true);
  }
}

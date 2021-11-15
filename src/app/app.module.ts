import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EventListComponent } from "./pages/event-list/event-list.component";
import { EventFormComponent } from "./pages/event-form/event-form.component";
import { CardEventComponent } from "./components/card-event/card-event.component";

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventFormComponent,
    CardEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

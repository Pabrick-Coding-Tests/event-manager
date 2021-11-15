import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventFormComponent } from "./pages/event-form/event-form.component";
import { EventListComponent } from "./pages/event-list/event-list.component";

const routes: Routes = [
  {
    path: "list",
    component: EventListComponent,
  },
  {
    path: "form",
    component: EventFormComponent
  },
  {
    path: "**",
    redirectTo: "list"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Params } from "@angular/router";
import { of } from "rxjs";

export class MockActivatedRoute {
  queryParams = of({
    params:{
      "id": "1"
    }
  } as Params)
}

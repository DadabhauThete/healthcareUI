import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchmemberComponent } from "./searchmember/searchmember.component";

const routes: Routes = [
  {
    path: "searchmember",
    component: SearchmemberComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchmemberRoutingModule {}

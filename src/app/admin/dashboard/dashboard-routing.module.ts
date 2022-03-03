import { DashboardComponent as patientDashboard } from "./../../patient/dashboard/dashboard.component";
import { DashboardComponent as doctorDashboard } from "./../../doctor/dashboard/dashboard.component";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { SearchmemberComponent } from "./searchmember/searchmember.component";
import { RegistermemberComponent } from "./registermember/registermember.component";
import { AddinsurancebenefitComponent } from "./addinsurancebenefit/addinsurancebenefit.component";
import { ViewinsurancebenefitComponent } from "./viewinsurancebenefit/viewinsurancebenefit.component";
import { MembersummaryComponent } from "./membersummary/membersummary.component";
import { EditmembersummaryComponent} from "./editmembersummary/editmembersummary.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "searchmember",
    pathMatch: "full",
  },
  {
    path: "main",
    component: MainComponent,
  },
  {
    path: "dashboard2",
    component: Dashboard2Component,
  },
  {
    path: "searchmember",
    component: SearchmemberComponent,
  },
  {
    path: "registermember",
    component: RegistermemberComponent,
  },
  {
    path: "addbenefitplan",
    component: AddinsurancebenefitComponent,
  },
  {
    path: "assigned-benefit-plan",
    component: ViewinsurancebenefitComponent,
  },
  {
    path: "assigned-benefit-plan/:id",
    component: ViewinsurancebenefitComponent,
  },
  {
    path: "membersummary",
    component: MembersummaryComponent,
  },
  {
    path: "membersummary/:id",
    component: MembersummaryComponent,
  },
  {
    path: "doctor-dashboard",
    component: doctorDashboard,
  },
  {
    path: "patient-dashboard",
    component: patientDashboard,
  },
  {
    path: "editmembersummary/:id",
    component: EditmembersummaryComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

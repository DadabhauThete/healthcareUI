import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MainComponent } from "./main/main.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { ChartsModule as chartjsModule } from "ng2-charts";

import { NgApexchartsModule } from "ng-apexcharts";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { SearchmemberComponent } from "./searchmember/searchmember.component";
import { RegistermemberComponent } from "./registermember/registermember.component";
import { AddinsurancebenefitComponent } from "./addinsurancebenefit/addinsurancebenefit.component";
import { ViewinsurancebenefitComponent } from "./viewinsurancebenefit/viewinsurancebenefit.component";
import { MembersummaryComponent } from "./membersummary/membersummary.component";

import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { MatStepperModule } from "@angular/material/stepper";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatDialogModule } from "@angular/material/dialog";
import { Deletemodel } from "./addinsurancebenefit/deleteModel/deletemodel.component";
import { EditmembersummaryComponent } from './editmembersummary/editmembersummary.component';
import { DeleteAssignedBenefitPlanComponent } from "../../admin/dashboard/membersummary/deleteassignbenefitplan/deleteassignedbenefitplan.component";
import { EditAssignedBenefitPlanComponent } from "../../admin/dashboard/membersummary/editassignbenefitplan/editassignedbenefitplan.component";

@NgModule({
  declarations: [
    MainComponent,
    Dashboard2Component,
    SearchmemberComponent,
    RegistermemberComponent,
    AddinsurancebenefitComponent,
    ViewinsurancebenefitComponent,
    MembersummaryComponent,
    Deletemodel,
    EditmembersummaryComponent,
    DeleteAssignedBenefitPlanComponent,
    EditAssignedBenefitPlanComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    chartjsModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    ComponentsModule,
    SharedModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule,
    MatSnackBarModule,
    MatSelectModule,

    NgxDatatableModule,
    MatDialogModule,
  ],
})
export class DashboardModule {}

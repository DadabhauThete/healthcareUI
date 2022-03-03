import { Component, OnInit, Output } from "@angular/core";
import { MemberData } from "./member.summary";
import { MemberSummary } from "../../../shared/services/member.summary.service";
import { MemberSearch } from "../../../shared/services/member.search.service";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DeleteAssignedBenefitPlanComponent } from "./deleteassignbenefitplan/deleteassignedbenefitplan.component";
import { RemoveAssignedBenfitPlan } from "../../../shared/services/remove.assigned.benfitplan.service";
import { EditAssignedBenefitPlanComponent } from "./editassignbenefitplan/editassignedbenefitplan.component";

@Component({
  selector: "app-membersummary",
  templateUrl: "./membersummary.component.html",
  styleUrls: ["./membersummary.component.sass"],
})
export class MembersummaryComponent implements OnInit {
  @Output()
  id: number;
  member: MemberData;
  datalist: boolean = false;
  // Delete Benefit Plan
  dialogValue: string;
  sendValue: any;

  // Edit Benefit Plan
  editDialogValue: string;
  editSendValue: any;

  //
  errors: any;
  simpleDialog: MatDialogRef<DeleteAssignedBenefitPlanComponent>;
  constructor(
    private memberdata: MemberSummary,
    private route: ActivatedRoute,
    private memebersearch: MemberSearch,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogModel: MatDialog,
    private deleteplan: RemoveAssignedBenfitPlan
  ) {}
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  // Edit Benefit Plan Start
  onEditClick(benefit: any, event): void {
    console.log(event, "POPUP EVENT");
    console.log(benefit.patientInsuranceId, "benefit.patientInsuranceId");
    this.sendValue = benefit.patientInsuranceId;
    const editdialogRef = this.dialogModel.open(
      EditAssignedBenefitPlanComponent,
      {
        width: "350px",

        data: { pageValue: this.sendValue },
      }
    );

    editdialogRef.afterClosed().subscribe((confirmresult) => {
      console.log(confirmresult);
      console.log(
        "The dialog was closed",
        confirmresult,
        benefit.patientInsuranceId
      );

      if (confirmresult) {
        this.deleteplan
          .removeAssignedBenfitPlanId(benefit.patientInsuranceId)
          .subscribe(
            (result) => {
              // Handle result
              console.log(result, "Plan Deleted Succusfully");
              //show pop up
              let colorName = "snackbar-success";
              let text = "Plan Edit Succusfully!";
              let placementFrom = "top";
              let placementAlign = "center";
              this.showNotification(
                colorName,
                text,
                placementFrom,
                placementAlign
              );
              setTimeout(() => {
                this.router.navigate([
                  "/admin/dashboard/assigned-benefit-plan/",
                  this.id,
                ]);
              }, 4000);
            },
            (error) => {
              this.errors = error;
            }
          );
      }
      this.dialogValue = confirmresult.data;
    });
  }
  // Edit Benefit Plan End
  // Delete Benefit Plan Start
  openDialog(benefit: any, event): void {
    console.log(event, "POPUP EVENT");
    console.log(benefit.patientInsuranceId, "benefit.patientInsuranceId");
    this.sendValue = benefit.patientInsuranceId;
    const dialogRef = this.dialogModel.open(
      DeleteAssignedBenefitPlanComponent,
      {
        width: "350px",

        data: { pageValue: this.sendValue },
      }
    );

    dialogRef.afterClosed().subscribe((confirmresult) => {
      console.log(confirmresult);
      console.log(
        "The dialog was closed",
        confirmresult,
        benefit.patientInsuranceId
      );

      if (confirmresult) {
        this.deleteplan
          .removeAssignedBenfitPlanId(benefit.patientInsuranceId)
          .subscribe(
            (result) => {
              // Handle result
              console.log(result, "Plan Deleted Succusfully");
              //show pop up
              let colorName = "snackbar-success";
              let text = "Plan Deleted Succusfully!";
              let placementFrom = "top";
              let placementAlign = "center";
              this.showNotification(
                colorName,
                text,
                placementFrom,
                placementAlign
              );
            },
            (error) => {
              this.errors = error;
            }
          );
      }
      this.dialogValue = confirmresult.data;
    });
  }
  // Delete Benefit Plan End
  ngOnInit(): void {
    if (this.router.url === "/admin/dashboard/membersummary") {
      //show pop up
      let colorName = "snackbar-danger";
      let text = "Please select member!";
      let placementFrom = "top";
      let placementAlign = "center";
      this.showNotification(colorName, text, placementFrom, placementAlign);
      // redirect

      this.router.navigate(["/admin/dashboard/searchmember"]);
    }
    this.id = this.route.snapshot.params["id"];
    console.log(this.id, "Page Id");
    this.memberdata
      .getMembersListById(this.id)
      .subscribe((data: MemberData) => {
        this.member = data;
        //this.sendValue = this.member;
        console.log(this.member, "Member Summary PAGE");
        // console.log(
        //   this.member.benfitPlanList.data,
        //   "Member Summary benfitPlanList"
        // );

        if (this.member.benfitPlanList.data === null) {
          console.log(
            this.member.benfitPlanList.data,
            "Member Summary benfitPlanList"
          );
          this.datalist = true;
        }
      });
  }
}

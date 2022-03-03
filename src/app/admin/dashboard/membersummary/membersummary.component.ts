import { Component, OnInit } from "@angular/core";
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
import { SimpleDialogComponent } from "./simpleDialog.component";

@Component({
  selector: "app-membersummary",
  templateUrl: "./membersummary.component.html",
  styleUrls: ["./membersummary.component.sass"],
})
export class MembersummaryComponent implements OnInit {
  id: number;
  member: MemberData;
  datalist: boolean = false;
  simpleDialog: MatDialogRef<SimpleDialogComponent>;
  constructor(
    private memberdata: MemberSummary,
    private route: ActivatedRoute,
    private memebersearch: MemberSearch,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogModel: MatDialog
  ) {}
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // dialog() {
  //   this.simpleDialog = this.dialogModel.open(SimpleDialogComponent);
  // }
  openDialog(): void {
    const dialogRef = this.dialogModel.open(SimpleDialogComponent, {
      width: "640px",
      disableClose: true,
    });
  }
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

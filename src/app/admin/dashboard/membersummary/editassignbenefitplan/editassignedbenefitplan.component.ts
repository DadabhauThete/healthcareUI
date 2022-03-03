import { Component, OnInit, Optional, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-deletemodel",
  templateUrl: "./editassignedbenefitplan.component.html",
})
export class EditAssignedBenefitPlanComponent {
  fromPage: number;
  fromDialog: string;
  id: number;

  constructor(
    public dialogRef: MatDialogRef<EditAssignedBenefitPlanComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fromPage = data.pageValue;
    console.log(this.fromPage, "POPUP");
  }

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close({ event: "close", data: this.fromDialog });
  }
}

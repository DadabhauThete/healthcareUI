import { Component, OnInit, Optional, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-deletemodel",
  templateUrl: "./deleteassignedbenefitplan.component.html",
})
export class DeleteAssignedBenefitPlanComponent {
  fromPage: number;
  fromDialog: string;
  id: number;
  deleteplan: any;
  errors: any;
  constructor(
    public dialogRef: MatDialogRef<DeleteAssignedBenefitPlanComponent>,
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

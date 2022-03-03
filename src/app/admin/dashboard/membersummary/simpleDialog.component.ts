import { Component } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { MemberSummary } from "../../../shared/services/member.summary.service";
import { MemberData } from "./member.summary";

@Component({
  template: `
    <div>
      <h2 mat-dialog-title>Terminate Plan</h2>
      <div mat-dialog-content>
        <p>Are you sure terminate the plan?</p>
        <p>Your plan end date is {{ id }}</p>
        <div class="btn-sec">
          <button class="btn-space" mat-raised-button color="primary">
            Terminate
          </button>
          <button type="button" mat-button (click)="closeDialog()">
            Cancel
          </button>
        </div>
      </div>
    </div>
  `,
})
export class SimpleDialogComponent {
  id: number;
  member: MemberData;
  constructor(
    public dialog: MatDialog,
    private memberdata: MemberSummary,
    private route: ActivatedRoute
  ) {}
  public ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id, "Model box");
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }
  onSubmitClick() {}
}

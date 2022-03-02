import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  template: `
    <h1 mat-dialog-title>terminate plan</h1>
    <div mat-dialog-content>
      <p>Are sure you want terminate plan?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </div>
  `,
})
export class SimpleDialogComponent {
  constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>) {}
  close(): void {
    this.dialogRef.close();
  }
}

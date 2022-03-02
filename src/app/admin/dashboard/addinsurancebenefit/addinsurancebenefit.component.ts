import { Component, OnInit, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { AddBenefitPlanService } from "../../../shared/services/add.benefitplan.service";
import { GetBenefitPlanService } from "../../../shared/services/get.benefitplan.service";
import { Benefit } from "../addinsurancebenefit/benefit";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { Deletemodel } from "./deleteModel/deleteModel.Component";

@Component({
  selector: "app-addinsurancebenefit",
  templateUrl: "./addinsurancebenefit.component.html",
  styleUrls: ["./addinsurancebenefit.component.sass"],
})
export class AddinsurancebenefitComponent implements OnInit {
  //today's date
  todayDate: Date = new Date();
  calculatedEndDate: any;
  isEndDateAvailable: boolean = true;
  benefits: Benefit[] = [];
  // Form 1
  benefit: any;
  addbenefitplan: FormGroup;
  hide = true;
  errors: any;
  // companyName:any;
  plandurationnumber = [1, 3, 5, 10, 15, 20, 25];
  insurance = ["Medical", "Dental"];
  labelPosition: "before" | "after" = "after";
  isEdit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private benefitservice: AddBenefitPlanService,
    public benefitsList: GetBenefitPlanService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.initForm();
  }
  initForm() {
    this.addbenefitplan = this.fb.group({
      insuranceInfoId: [0],
      companyName: ["", [Validators.required]],
      planName: ["", [Validators.required]],
      insuranceType: ["", [Validators.required]],
      planDuration: [],
      planStartDate: ["", [Validators.required]],
      planEndDate: [""],
      isAcive: ["true", [Validators.required]],
      description: [""],
    });
  }

  ngOnInit(): void {
    this.getBenefitDataList();
  }

  calculateDate() {
    if (
      this.addbenefitplan.value.planStartDate &&
      this.addbenefitplan.value.planDuration
    ) {
      this.addbenefitplan.value.planEndDate = new Date();
      console.log("start", this.addbenefitplan.value.planStartDate);
      console.log("end", this.addbenefitplan.value.planEndDate);

      let startDateYear = this.addbenefitplan.value.planStartDate.getFullYear();
      let addedDuration =
        startDateYear + this.addbenefitplan.value.planDuration;
      let endDate =
        this.addbenefitplan.value.planEndDate.setFullYear(addedDuration);
      let convertedDate = new Date(endDate).toISOString();
      this.addbenefitplan.value.planEndDate = convertedDate;
      this.calculatedEndDate = convertedDate;
      this.isEndDateAvailable = true;

      console.log("start", this.addbenefitplan.value.planStartDate);
      console.log("end", this.addbenefitplan.value.planEndDate);
    }
  }
  getBenefitDataList() {
    this.benefitsList.getAllBenefitPlan().subscribe((data) => {
      this.benefit = data;
      console.log(this.benefit);
    });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  onEditClick(member: any) {
    this.isEdit = true;
    console.log(member, "onEdit click");
    member.isAcive === true
      ? (member.isAcive = "true")
      : (member.isAcive = "false");
    // member.planStartDate = null;
    this.addbenefitplan.patchValue(member);
    console.log(this.addbenefitplan.value);
  }

  openDialog(member: any) {
    const dialogRef = this.dialog.open(Deletemodel);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(member.insuranceInfoId);
      this.benefitservice.deleteBenefitPlan(member.insuranceInfoId).subscribe(
        (result) => {
          console.log(result);
          this.getBenefitDataList();

          console.log(this.showNotification);
        },
        (error) => {
          this.errors = error;
        },
        () => this.addbenefitplan.reset()
      );
    });
  }

  onRegister(formData: any, formDirective: FormGroupDirective) {
    this.addbenefitplan.value["isAcive"] === "true"
      ? (this.addbenefitplan.value["isAcive"] = true)
      : (this.addbenefitplan.value["isAcive"] = false);
    if (this.isEdit) {
      //check for null values
      const values = this.addbenefitplan.value;
      const isNullish = Object.values(values).every((value) => {
        if (value === null || value === "") {
          return true;
        }
        return false;
      });

      //edit functionality
      if (!isNullish) {
        //edit scenario
        if (this.addbenefitplan.value.planStartDate === null) {
          let colorName = "snackbar-danger";
          let text = "Please select plan Start date";
          let placementFrom = "top";
          let placementAlign = "center";
          this.showNotification(colorName, text, placementFrom, placementAlign);
        }
        this.benefitservice
          .editBenefitPlan(this.addbenefitplan.value)
          .subscribe(
            (result) => {
              this.getBenefitDataList();
              formDirective.resetForm();
              this.addbenefitplan.reset();
              console.log(result);
              let colorName = "snackbar-success";
              let text = "Benefit plan Updated successfully!!!";
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
            },
            () => this.addbenefitplan.reset()
          );
        console.log("on edit action not null", isNullish);
      } else {
        console.log("null or empty", isNullish);
      }
      // add benefit plan
    } else {
      if (this.addbenefitplan.valid) {
        this.benefitservice.addBenefitPlan(this.addbenefitplan.value).subscribe(
          (result) => {
            // Handle result
            this.getBenefitDataList();
            formDirective.resetForm();
            this.addbenefitplan.reset();
            let colorName = "snackbar-success";
            let text = "Benefit plan added successfully!!!";
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
          },

          () => this.addbenefitplan.reset()
        );
      }
    }
  }
}

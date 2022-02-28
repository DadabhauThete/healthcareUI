import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddBenefitPlanService } from "../../../shared/services/add.benefitplan.service";
import { GetBenefitPlanService } from "../../../shared/services/get.benefitplan.service";
import { Benefit } from "../addinsurancebenefit/benefit";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  plandurationnumber = [1, 3, 5, 10, 15, 20, 25];
  insurance = ["Medical", "Dental"];
  labelPosition: "before" | "after" = "after";
  constructor(
    private fb: FormBuilder,
    private benefitservice: AddBenefitPlanService,
    public benefitsList: GetBenefitPlanService,
    private snackBar: MatSnackBar
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
      isAcive: ["", [Validators.required]],
      description: [""],
    });
  }

  ngOnInit(): void {
    this.getBenefitDataList();
  }

  calculateDate() {
    if (this.addbenefitplan.value.planStartDate) {
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
  onRegister() {
    console.log(this.addbenefitplan.value.planEndDate);
    if (this.addbenefitplan.valid) {
      console.log("inside if", this.addbenefitplan.value.planEndDate);
      console.log(this.addbenefitplan.get(["isAcive"])?.value);
      this.addbenefitplan.value["isAcive"] === "true"
        ? (this.addbenefitplan.value["isAcive"] = true)
        : (this.addbenefitplan.value["isAcive"] = false);

      this.benefitservice.addBenefitPlan(this.addbenefitplan.value).subscribe(
        (result) => {
          // Handle result
          this.getBenefitDataList();
          console.log(result, "Member Register Succusfully");
          this.addbenefitplan.reset();
          let colorName = "snackbar-success";
          let text = "Benefit plan added successfully!!!";
          let placementFrom = "top";
          let placementAlign = "center";
          this.showNotification(colorName, text, placementFrom, placementAlign);
        },
        (error) => {
          this.errors = error;
        },
        () => this.addbenefitplan.reset()
      );
    }

    console.log("Form Value", this.addbenefitplan.value);
    // console.log('next', nextDate)
  }
}

import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddBenefitPlanService } from "../../../shared/services/add.benefitplan.service";
import { GetBenefitPlanService } from "../../../shared/services/get.benefitplan.services";
import { Benefit } from "../addinsurancebenefit/benefit";
@Component({
  selector: "app-addinsurancebenefit",
  templateUrl: "./addinsurancebenefit.component.html",
  styleUrls: ["./addinsurancebenefit.component.sass"],
})
export class AddinsurancebenefitComponent implements OnInit {
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
    public benefitsList: GetBenefitPlanService
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
      planEndDate: ["", [Validators.required]],
      isAcive: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.benefitsList.getAllBenefitPlan().subscribe((data) => {
      this.benefit = data;
      console.log(this.benefit);
    });
  }
  onRegister() {
    if (this.addbenefitplan.valid) {
      //console.log(this.addbenefitplan.get(["isAcive"])?.value);
      this.addbenefitplan.value["isAcive"] === "true"
        ? (this.addbenefitplan.value["isAcive"] = true)
        : (this.addbenefitplan.value["isAcive"] = false);

      this.benefitservice.addBenefitPlan(this.addbenefitplan.value).subscribe(
        (result) => {
          // Handle result
          console.log(result, "Member Register Succusfully");
        },
        (error) => {
          this.errors = error;
        },
        () => this.addbenefitplan.reset()
      );
    }
    console.log("Form Value", this.addbenefitplan.value);
  }
}

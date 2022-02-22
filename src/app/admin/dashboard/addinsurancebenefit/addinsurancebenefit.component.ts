import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-addinsurancebenefit",
  templateUrl: "./addinsurancebenefit.component.html",
  styleUrls: ["./addinsurancebenefit.component.sass"],
})
export class AddinsurancebenefitComponent implements OnInit {
  // Form 1
  addbenefitplan: FormGroup;
  hide = true;
  labelPosition: "before" | "after" = "after";
  constructor(private fb: FormBuilder) {
    this.initForm();
  }
  initForm() {
    this.addbenefitplan = this.fb.group({
      benefitID: [""],
      insuranceType: [""],
      insuranceName: ["", [Validators.required]],
      planProductName: [""],
      companyName: ["", [Validators.required]],
      planName: ["", [Validators.required]],
      planDuration: ["", [Validators.required]],
      startdate: ["", [Validators.required]],
      enddate: ["", [Validators.required]],
      isactive: [""],
      description: ["", [Validators.required]],
    });
  }
  ngOnInit(): void {}
  onRegister() {
    console.log("Form Value", this.addbenefitplan.value);
  }
}

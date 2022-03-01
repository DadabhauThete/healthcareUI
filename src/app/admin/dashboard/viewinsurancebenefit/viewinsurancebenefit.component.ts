import { Component, OnInit } from "@angular/core";
import { GetBenefitPlanService } from "../../../shared/services/get.benefitplan.service";
import { MemberSummary } from "../../../shared/services/member.summary.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MemberData } from "../membersummary/member.summary";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { Benefit } from "../addinsurancebenefit/benefit";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AssignBenefit } from "./assignbenefitplan";
import { AssignBenfitPlanService } from "../../../shared/services/assign.benfitplan.service";
@Component({
  selector: "app-viewinsurancebenefit",
  templateUrl: "./viewinsurancebenefit.component.html",
  styleUrls: ["./viewinsurancebenefit.component.sass"],
})
export class ViewinsurancebenefitComponent implements OnInit {
  id: number;
  member: MemberData;
  responsedata;
  assignbenefitplan: FormGroup;
  patientId: number;
  insuranceId: number;
  benefits: Benefit[] = [];
  error: any;
  errors: any;
  plandurationnumber = [1, 3, 5, 10, 15, 20, 25];
  //today's date
  todayDate: Date = new Date();
  calculatedEndDate: any;
  isEndDateAvailable: boolean = true;
  constructor(
    public benefitsList: GetBenefitPlanService,
    private memberdata: MemberSummary,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private assignbenefit: AssignBenfitPlanService
  ) {
    this.initForm();
  }
  initForm() {
    this.assignbenefitplan = this.fb.group({
      patientId: [],
      insuranceId: [],
      term: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      isActive: ["0", [Validators.required]],
      oldBenfitPlanId: [0],
    });
  }
  calculateDate() {
    if (this.assignbenefitplan.value.startDate) {
      this.assignbenefitplan.value.endDate = new Date();
      console.log("start", this.assignbenefitplan.value.startDate);
      console.log("end", this.assignbenefitplan.value.endDate);

      let startDateYear = this.assignbenefitplan.value.startDate.getFullYear();
      let addedDuration = startDateYear + this.assignbenefitplan.value.term;

      let endDate =
        this.assignbenefitplan.value.endDate.setFullYear(addedDuration);
      let convertedDate = new Date(endDate).toISOString();
      this.assignbenefitplan.value.endDate = convertedDate;
      this.calculatedEndDate = convertedDate;
      this.isEndDateAvailable = true;

      console.log("start", this.assignbenefitplan.value.startDate);
      console.log("end", this.assignbenefitplan.value.endDate);
    }
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  ngOnInit(): void {
    if (this.router.url === "/admin/dashboard/assigned-benefit-plan") {
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
        console.log(this.member, "Member Data");
      });

    this.benefitsList.getAllBenefitPlan().subscribe(
      (result) => {
        this.responsedata = result;
        console.log(this.responsedata, "this.responsedata");
      },
      (error) => {
        this.error = error;
      }
    );
  }
  onItemChange(event) {
    this.insuranceId = event.value;
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  onAssignBenefit(formData: any, formDirective: FormGroupDirective) {
    // console.log(this.assignbenefitplan.value);
    if (this.assignbenefitplan.valid) {
      this.assignbenefitplan.value.patientId = Number(this.id);
      this.assignbenefitplan.value.insuranceId = Number(this.insuranceId);
      this.assignbenefitplan.value.isActive = Number(
        this.assignbenefitplan.value.isActive
      );
      this.assignbenefit.addBenefitPlan(this.assignbenefitplan.value).subscribe(
        (result) => {
          let colorName = "snackbar-success";
          let text = "Benefit plan added successfully!!!";
          let placementFrom = "top";
          let placementAlign = "center";
          this.showNotification(colorName, text, placementFrom, placementAlign);
          console.log(result, "Member Register Succusfully");
          //Reset Form
          formDirective.resetForm();
          this.assignbenefitplan.reset();
          //Reset Form end
          setTimeout(() => {
            this.router.navigate(["/admin/dashboard/membersummary/" + this.id]);
          }, 6000);
          //this.assignbenefitplan.reset();
        },
        (error) => {
          this.errors = error;
        }
      );
    }
  }
}

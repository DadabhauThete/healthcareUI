import { Component, OnInit } from "@angular/core";
import { GetBenefitPlanService } from "../../../shared/services/get.benefitplan.service";
import { MemberSummary } from "../../../shared/services/member.summary.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MemberData } from "../membersummary/member.summary";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AssignBenefit } from "./assignbenefitplan";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-viewinsurancebenefit",
  templateUrl: "./viewinsurancebenefit.component.html",
  styleUrls: ["./viewinsurancebenefit.component.sass"],
})
export class ViewinsurancebenefitComponent implements OnInit {
  id: number;
  member: MemberData;
  benefits: any;
  responsedata;
  assignbenefitplan: FormGroup;
  benefit: AssignBenefit[] = [];
  error: any;
  lists: any;

  constructor(
    public benefitsList: GetBenefitPlanService,
    private memberdata: MemberSummary,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }
  initForm() {
    this.assignbenefitplan = this.fb.group({
      patientId: ["", [Validators.pattern("^[0-9]+$")]],
      insuranceId: ["", [Validators.pattern("^[a-zA-Z]*$")]],
      term: [],
      startDate: [],
      endDate: [],
      isActive: [],
      oldBenfitPlanId: [],
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
        //console.log(this.responsedata.data, "this.responsedata");
        // this.benefits.data.companyName
        this.responsedata.data.forEach(function (value) {
          //this.lists = value;
          console.log(value, "this.listvalue");
        });
      },
      (error) => {
        this.error = error;
      }
    );
  }

  onAssignBenefit() {}
}

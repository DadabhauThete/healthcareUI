import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Member } from "../registermember/member.interface";
import { UpdateMemberDetails } from "../../../shared/services/update.memberdetails.service";
import { MemberSummary } from "../../../shared/services/member.summary.service";
import { MemberData } from "../membersummary/member.summary";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
@Component({
  selector: "app-editmembersummary",
  templateUrl: "./editmembersummary.component.html",
  styleUrls: ["./editmembersummary.component.sass"],
})
export class EditmembersummaryComponent implements OnInit {
  id: number;
  member: MemberData;
  patientId: number;
  insuranceId: number;
  //
  editmembersummary: FormGroup;
  isLinear = false;
  respondata: any;
  submitted = false;
  hide = true;
  errors: any;
  maxDate = new Date();
  removeClass: boolean = false;
  selectDate: any;
  currentDate = new Date();
  isAgeAvailable: boolean = false;
  ageYear: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private updateMemberDetails: UpdateMemberDetails,
    private route: ActivatedRoute,
    private router: Router,
    private memberSummary: MemberSummary
  ) {}
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id, "Page Id");

    this.editmembersummary = this.fb.group({
      personal: this.fb.group({
        firstName: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern("^[_A-z0-9]*((-|s)*[_A-z0-9])*$"),
          ],
        ],
        middleName: [""],
        lastname: ["", [Validators.required]],
        gender: ["Male", [Validators.required]],
        dateOfBirth: ["", [Validators.required]],
        age: ["", { value: "", disabled: true }],
        ssn: ["", [Validators.required]],
        email: [
          "",
          [
            Validators.required,
            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
          ],
        ],
        contactNo: [
          "",
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern("^[0-9]+$"),
          ],
        ],
      }),
      address: this.fb.group({
        address1: ["", [Validators.required]],
        address2: [""],
        country: ["", [Validators.required]],
        state: ["", [Validators.required]],
        city: ["", [Validators.required]],
        zipCode: ["", [Validators.required]],
      }),
    });
    // this.memberSummary
    //   .getMembersListById(this.id)
    //   .subscribe((data: MemberData) => {
    //     console.log(data, "Data from API");
    //     this.editmembersummary.setValue(data);
    //   });
    if (this.id) {
      this.memberSummary
        .getMembersListById(this.id)
        .pipe(first())
        .subscribe((x) => this.editmembersummary.patchValue(x));
    }
    this.getAge();
  }
  get firstName() {
    return this.editmembersummary.get(["personal", "firstName"]);
  }

  get middleName() {
    return this.editmembersummary.get(["personal", "middleName"]);
  }
  get lastname() {
    return this.editmembersummary.get(["personal", "lastname"]);
  }
  get gender() {
    return this.editmembersummary.get(["personal", "gender"]);
  }
  get dateOfBirth() {
    return this.editmembersummary.get(["personal", "dateOfBirth"]);
  }
  get age() {
    return this.editmembersummary.get(["personal", "age"]);
  }
  get ssn() {
    return this.editmembersummary.get(["personal", "ssn"]);
  }
  get email() {
    return this.editmembersummary.get(["personal", "email"]);
  }
  get contactNo() {
    return this.editmembersummary.get(["personal", "contactNo"]);
  }
  get address1() {
    return this.editmembersummary.get(["address", "address1"]);
  }
  get address2() {
    return this.editmembersummary.get(["address", "address2"]);
  }
  get country() {
    return this.editmembersummary.get(["address", "country"]);
  }
  get state() {
    return this.editmembersummary.get(["address", "state"]);
  }
  get city() {
    return this.editmembersummary.get(["address", "city"]);
  }
  get zipCode() {
    return this.editmembersummary.get(["address", "zipCode"]);
  }

  updateCalcs() {
    console.log(this.editmembersummary.get(["personal", "dateOfBirth"])?.value);
    this.selectDate = this.editmembersummary.get([
      "personal",
      "dateOfBirth",
    ])?.value;
  }

  showAge() {
    this.getAge();
    console.log(this.ageYear);
  }
  getAge() {
    let diffYear =
      (this.currentDate.getTime() - this.selectDate.getTime()) / 1000;
    diffYear /= 60 * 60 * 24;
    this.ageYear = Math.abs(Math.round(diffYear / 365.25));
    this.isAgeAvailable = true;
    return this.ageYear;
  }

  onRegister(formData: any, formDirective: FormGroupDirective) {
    let colorName = "snackbar-success";
    let text = "Member Register Successfully!!!";
    let placementFrom = "top";
    let placementAlign = "center";
    if (this.editmembersummary.value) {
      console.log("Form Value", this.editmembersummary.value, this.id);

      this.updateMemberDetails
        .updateMemberDetailsId(this.editmembersummary.value)
        .subscribe(
          (result) => {
            // Handle result
            console.log(result, "Details Updated Succusfully");
          },
          (error) => {
            this.errors = error;
          }
        );
      this.removeClass = true;
      //Reset Form
      formDirective.resetForm();
      this.editmembersummary.reset();
      //Reset Form end
      this.showNotification(colorName, text, placementFrom, placementAlign);
    }
  }
}

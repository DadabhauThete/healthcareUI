import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { MemberRegistrationService } from "src/app/shared/services/member.registration.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-registermember",
  templateUrl: "./registermember.component.html",
  styleUrls: ["./registermember.component.sass"],
})
export class RegistermemberComponent implements OnInit {
  @ViewChild("f") myNgForm;
  registerMember: FormGroup;
  isLinear = false;
  respondata: any;
  submitted = false;
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
  hide = true;
  errors: any;
  maxDate = new Date();
  removeClass: boolean = false;
  selectDate:any;
  currentDate = new Date();
  isAgeAvailable:boolean = false;
  ageYear: any;

  constructor(
    private fb: FormBuilder,
    private memberregistration: MemberRegistrationService,
    private snackBar: MatSnackBar,
    private el: ElementRef
  ) {
    this.initForm();
  }
  myTag = this.el.nativeElement.querySelector("mat-form-field");

  initForm() {
    this.registerMember = this.fb.group({
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
        gender: ["", [Validators.required]],
        dateOfBirth: ["", [Validators.required]],
        age: ["", [Validators.maxLength(2)]],
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
        address2: ["", [Validators.required]],
        country: ["", [Validators.required]],
        state: ["", [Validators.required]],
        city: ["", [Validators.required]],
        zipCode: ["", [Validators.required]],
      }),
    });
  }

  ngOnInit(): void {
    this.getAge();
  }
  get firstName() {
    return this.registerMember.get(["personal", "firstName"]);
  }

  get middleName() {
    return this.registerMember.get(["personal", "middleName"]);
  }
  get lastname() {
    return this.registerMember.get(["personal", "lastname"]);
  }
  get gender() {
    return this.registerMember.get(["personal", "gender"]);
  }
  get dateOfBirth() {
    return this.registerMember.get(["personal", "dateOfBirth"]);
  }
  get age() {
    return this.registerMember.get(["personal", "age"]);
  }
  get email() {
    return this.registerMember.get(["personal", "email"]);
  }
  get contactNo() {
    return this.registerMember.get(["personal", "contactNo"]);
  }
  get address1() {
    return this.registerMember.get(["address", "address1"]);
  }
  get address2() {
    return this.registerMember.get(["address", "address2"]);
  }
  get country() {
    return this.registerMember.get(["address", "country"]);
  }
  get state() {
    return this.registerMember.get(["address", "state"]);
  }
  get city() {
    return this.registerMember.get(["address", "city"]);
  }
  get zipCode() {
    return this.registerMember.get(["address", "zipCode"]);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }


  updateCalcs() {
    console.log(this.registerMember.get(["personal", "dateOfBirth"])?.value);
    this.selectDate = this.registerMember.get([
      "personal",
      "dateOfBirth",
    ])?.value;
  }

  showAge(){
    this.getAge();
    console.log(this.ageYear);
  }
  getAge() {
    let diffYear =
      (this.currentDate.getTime() - this.selectDate.getTime()) / 1000;
    diffYear /= 60 * 60 * 24;
    this.ageYear = Math.abs(Math.round(diffYear / 365.25));
    this.isAgeAvailable = true
    return this.ageYear
  }


  onRegister() {
    let colorName = "snackbar-success";
    let text = "Member Register Successfully!!!";
    let placementFrom = "top";
    let placementAlign = "center";
    if (this.registerMember.value) {
      console.log("Form Value", this.registerMember.value);
      this.showNotification(colorName, text, placementFrom, placementAlign);
      this.memberregistration.registerUser(this.registerMember.value).subscribe(
        (result) => {
          // Handle result
          console.log(result, "Member Register Succusfully");
        },
        (error) => {
          this.errors = error;
        },
        () => this.registerMember.reset()
      );
      this.removeClass = true;
      this.registerMember.reset();
    }
  }
  onReset() {
    this.registerMember.reset();
  }
  
}

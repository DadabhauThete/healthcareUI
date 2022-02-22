import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { MemberRegistrationService } from "src/app/shared/services/member.registration.service";

@Component({
  selector: "app-registermember",
  templateUrl: "./registermember.component.html",
  styleUrls: ["./registermember.component.sass"],
})
export class RegistermemberComponent implements OnInit {
  registerMember: FormGroup;
  isLinear = false;
  respondata: any;
  submitted = false;
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
  hide = true;
  errors: any;
  constructor(
    private fb: FormBuilder,
    private memberregistration: MemberRegistrationService
  ) {
    this.initForm();
  }
  snackPositionTopCenter() {}
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
        middleName: ["", [Validators.required]],
        lastname: ["", [Validators.required]],
        gender: ["", [Validators.required]],
        dateOfBirth: ["", [Validators.required]],
        age: ["", [Validators.required, Validators.maxLength(2)]],
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
    this.HFormGroup1 = this.fb.group({
      firstName: ["", Validators.required],
      middleName: [""],
      lastname: ["", Validators.required],
      gender: ["", [Validators.required]],
      dateOfBirth: ["", [Validators.required]],
      age: [],
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
    });
    this.HFormGroup2 = this.fb.group({
      address1: ["", [Validators.required]],
      address2: ["", [Validators.required]],
      country: ["", [Validators.required]],
      state: ["", [Validators.required]],
      city: ["", [Validators.required]],
      zipCode: ["", [Validators.required]],
    });
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
  onRegister() {
    if (this.registerMember.value) {
      console.log("Form Value", this.registerMember.value);
      this.memberregistration.registerUser(this.registerMember.value).subscribe(
        (result) => {
          // Handle result
          console.log(result, "Member Register Succusfully");
        },
        (error) => {
          this.errors = error;
        },
        () => {
          // 'onCompleted' callback.
          // No errors, route to new page here
        }
      );
      this.onReset();
    }
  }
  onReset() {
    this.submitted = false;
    this.registerMember.reset();
  }
}

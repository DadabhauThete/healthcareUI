import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: 'app-editmembersummary',
  templateUrl: './editmembersummary.component.html',
  styleUrls: ['./editmembersummary.component.sass']
})
export class EditmembersummaryComponent implements OnInit {
  Editmembersummary: FormGroup;
  isLinear = false;
  respondata: any;
  submitted = false;
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
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
  ) {
    this.initForm();
  }
  initForm() {
    this.Editmembersummary = this.fb.group({
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
  }  

  ngOnInit(): void {
  }

}

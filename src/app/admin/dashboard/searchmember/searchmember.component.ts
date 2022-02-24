import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MemberSearch } from "src/app/shared/services/member.search.service";
import { Members } from "./member";
import { Observable, of, throwError } from "rxjs";
import { Router } from "@angular/router";
import { stringify } from "querystring";

@Component({
  selector: "app-searchmember",
  templateUrl: "./searchmember.component.html",
  styleUrls: ["./searchmember.component.sass"],
})
export class SearchmemberComponent implements OnInit {
  // Form 1
  search: FormGroup;
  hide = true;
  errors: any;
  members: any;
  isMember: boolean = false;
  memberById: any;
  error: any;
  constructor(
    private fb: FormBuilder,
    private searchmember: MemberSearch,
    private router: Router
  ) {
    this.initForm();
  }
  initForm() {
    this.search = this.fb.group({
      patientId: ['', [Validators.pattern("^[0-9]+$")]],
      firstName: [''],
      middleName: [''],
      lastname: [''],
      dateOfBirth: [''],
      age: [''],
      contactNo: [''
        ,
        [
          // Validators.required,
          Validators.maxLength(10),
          Validators.pattern("^[0-9]+$"),
        ],
      ],
    });
  }
  ngOnInit(): void {}
  onRegister() {
    console.log("Form Value", this.search.value);
  }

  checkType(){
    const values = this.search.value;
    values.patientId === '' || values.patientId === null ? values.patientId = 0 : Number(values.patientId);
      values.age === '' || values.age === null ? values.age = 0 : Number(values.age);
      values.firstName === '' || values.firstName === null ? values.firstName = '' : values.firstName;
      values.middleName === '' || values.middleName === null ? values.middleName = '' : values.middleName;
      values.lastname === '' || values.lastname === null ? values.lastname = '' : values.lastname;
      values.dateOfBirth === '' || values.dateOfBirth === null ? values.dateOfBirth = null : values.dateOfBirth;
      values.contactNo === '' || values.contactNo === null ? values.contactNo = '' : values.contactNo;
  }

  onSearch() {
    const values = this.search.value;
    const isNullish = Object.values(values).every((value) => {
      if (value === ''||value === null) {
        return true;
      }
      return false;
    });
    if (isNullish) {
      alert("please enter atleast one value");
      console.log(values)
    } else if (values) {
      this.checkType();
      console.log(values);
      
     
      this.searchmember.getMembersList(values).subscribe(
        (data) => {
          this.members = data;
          this.isMember = true;
        },
        (error) => {
          this.isMember = true;
          this.error = error;
          console.log(this.error);
        }
      );
    }
    console.log(isNullish);
    this.search.reset();
  }
}

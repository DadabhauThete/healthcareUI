import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MemberSearch } from "src/app/shared/services/member.search.service";
import { Members } from "./member";
import { Observable, of, throwError } from "rxjs";
import { Router } from "@angular/router";

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
      patientId: [, [Validators.pattern("^[0-9]+$")]],
      firstName: [],
      middleName: [],
      lastname: [],
      dateOfBirth: [],
      age: [],
      contactNo: [
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
  onAddClick() {
    console.log("add clicked");
  }
  onViewClick(id: number) {
    console.log(id);
    this.searchmember.getMembersListById(id).subscribe((data) => {
      this.memberById = data;
      console.log("memberById", this.memberById, data);
    });
    this.router.navigate(["/admin/dashboard/membersummary"]);
  }

  onSearch() {
    const values = this.search.value;
    const isNullish = Object.values(values).every((value) => {
      if (value === null) {
        return true;
      }
      return false;
    });
    if (isNullish) {
      alert("please enter atleast one value");
    } else if (values) {
      values.patientId === null ? (values.patientId = 0) : values.patientId;
      values.age === null ? (values.age = 0) : values.age;
      console.log(values.patientId);
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
  }
}

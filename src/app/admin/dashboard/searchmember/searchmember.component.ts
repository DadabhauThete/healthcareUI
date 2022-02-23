import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MemberSearch } from "src/app/shared/services/member.search.service";
import { Members } from "./member";

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
  isMember: boolean;
  constructor(private fb: FormBuilder, private searchmember: MemberSearch) {
    this.initForm();
  }
  initForm() {
    this.search = this.fb.group({
      patientId: [
        0,
        [Validators.maxLength(10), Validators.pattern("^[0-9]+$")],
      ],
      firstName: [
        "",
        [
          // Validators.required,
          Validators.minLength(2),
          Validators.pattern("^[_A-z0-9]*((-|s)*[_A-z0-9])*$"),
        ],
      ],
      middleName: [""],
      lastname: [""],
      dateOfBirth: [],
      age: 0,
      contactNo: [
        "",
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

  onSearch() {
    if (this.search.value) {
      console.log("Form Value", this.search.value);
      this.searchmember.getMembersList(this.search.value).subscribe((data) => {
        this.members = data;
        this.isMember = true;
      });
    }
    console.log(this.members, "this is empty menber");
  }
}

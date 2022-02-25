import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  respondata: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    // this.authForm = this.formBuilder.group({
    //   username: ["admin@gmail.com", Validators.required],
    //   password: ["admin123", Validators.required],
    // });
    this.initForm();
  }
  initForm() {
    this.authForm = new FormGroup({
      emailId: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
      ]),
      password: new FormControl("", [Validators.required]),
    });
  }
  get email() {
    return this.authForm.get("emailId");
  }
  get password() {
    return this.authForm.get("password");
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("emailId").setValue("admin@gmail.com");
    this.authForm.get("password").setValue("admin123");
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.valid) {
      this.authService.login(this.authForm.value).subscribe(
        (res) => {
          //console.log(res);
          this.respondata = res;
          console.log(this.respondata, "Respose Data");
          localStorage.setItem("token", this.respondata.token);
          this.router.navigate(["/admin/dashboard/searchmember"]);
          // if (res != null) {
          //   setTimeout(() => {
          //     this.respondata = res;
          //     localStorage.setItem("token", this.respondata.token);
          //     // if (this.respondata.roleName === "0") {
          //     //   this.router.navigate(["/admin/dashboard/searchmember"]);
          //     // }
          //     this.router.navigate(["/admin/dashboard/searchmember"]);
          //     console.log(this.respondata);
          //     this.loading = false;
          //   }, 1000);
          // } else {
          //   alert(res);
          // }
          // if (res) {
          //   setTimeout(() => {
          //     const role = this.authService.currentUserValue.role;
          //     if (role === Role.All || role === Role.Admin) {
          //       this.router.navigate(["/admin/dashboard/searchmember"]);
          //     }
          //     this.loading = false;
          //   }, 1000);
          // } else {
          //   this.error = "Invalid Login";
          // }
        },
        (error) => {
          this.error = error;
          this.submitted = false;
          this.loading = false;
          console.log(this.error);
        }
      );
    } else {
      this.error = "Username and Password not valid !";
      return;
    }
  }
}

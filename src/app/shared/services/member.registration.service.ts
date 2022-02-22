import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Member } from "../../admin/dashboard/registermember/member.interface";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class MemberRegistrationService {
  constructor(private router: Router, private http: HttpClient) {}
  member: Member;
  registerUser(member: Member): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}Patient/Enrole`,
      member,
      httpOptions
    );
    console.log("I am Server");
  }

  // login(data: any) {
  //   return this.http.post(
  //     `${environment.baseUrl}Account/login`,
  //     JSON.stringify(data),
  //     httpOptions
  //   );
  //   console.log("I am Server");
  // }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

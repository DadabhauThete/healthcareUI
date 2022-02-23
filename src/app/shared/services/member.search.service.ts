import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { retry, catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
import { Members } from "../../admin/dashboard/searchmember/member";
@Injectable({
  providedIn: "root",
})
export class MemberSearch {
  //patientData: Patient;
  headers = new HttpHeaders().set("Content-Type", "application/json");
  constructor(private http: HttpClient) {}

  getMembersList(memberData: Members) {
    return this.http.post(
      `${environment.baseUrl}Patient/PatientSearch`,
      memberData,
      httpOptions
    );
  }

  getMembersListById(id:number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("patientID",id);
    return this.http.get(
      `${environment.baseUrl}Patient/GetPatientSummary`,{params:queryParams}

    );
  }

  processError(err: any) {
    let message = "";
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }
}

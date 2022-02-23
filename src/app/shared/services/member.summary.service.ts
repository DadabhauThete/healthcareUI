import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { retry, catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { MemberData } from "../../admin/dashboard/membersummary/member.summary";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class MemberSummary {
  constructor(private http: HttpClient) {}

  // getMemberSummary(id): Observable<any> {
  //   return this.http.get(
  //     `${environment.baseUrl}/Patient/GetPatientSummary/${id}`
  //   );
  // }
  getMemberSummary(id): Observable<MemberData> {
    return this.http
      .get<MemberData>(`${environment.baseUrl}/Patient/GetPatientSummary/+id`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

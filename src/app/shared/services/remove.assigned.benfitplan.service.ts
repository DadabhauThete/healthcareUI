import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class RemoveAssignedBenfitPlan {
  errorHandler: any;
  headers = new HttpHeaders().set("Content-Type", "application/json");
  constructor(private http: HttpClient) {}
  removeAssignedBenfitPlanId(id: number): Observable<any> {
    return this.http
      .delete(
        `${environment.baseUrl}Benfit/RemoveAssignedBenfitPlanById/${id}`,
        httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
}

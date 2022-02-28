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
import { Benefit } from "../../admin/dashboard/addinsurancebenefit/benefit";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class GetBenefitPlanService {
  constructor(private router: Router, private http: HttpClient) {}
  //benefit: Benefit[];
  errorHandler: any;

  getAllBenefitPlan(): Observable<Benefit[]> {
    return this.http
      .get(`${environment.baseUrl}Benfit/GetAllBenfitPlan`)
      .pipe(catchError(this.errorHandler));
  }
}

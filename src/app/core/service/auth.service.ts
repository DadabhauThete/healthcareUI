import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environments/environment";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(data: any) {
    return this.http
      .post<any>(`${environment.baseUrl}Account/login`, data, httpOptions)
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
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

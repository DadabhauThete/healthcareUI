import { Component, OnInit } from "@angular/core";
import { MemberData } from "./member.summary";
import { MemberSummary } from "../../../shared/services/member.summary.service";

import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-membersummary",
  templateUrl: "./membersummary.component.html",
  styleUrls: ["./membersummary.component.sass"],
})
export class MembersummaryComponent implements OnInit {
  id!: number;
  member!: MemberData;
  constructor(
    private memberdata: MemberSummary,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["patientID"];

    this.memberdata.getMemberSummary(this.id).subscribe((data: MemberData) => {
      this.member = data;
    });
  }
}

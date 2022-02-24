import { Component, OnInit } from "@angular/core";
import { MemberData } from "./member.summary";
import { MemberSummary } from "../../../shared/services/member.summary.service";
import { MemberSearch } from "../../../shared/services/member.search.service";

import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-membersummary",
  templateUrl: "./membersummary.component.html",
  styleUrls: ["./membersummary.component.sass"],
})
export class MembersummaryComponent implements OnInit {
  id: number;
  member: MemberData;
  constructor(
    private memberdata: MemberSummary,
    private route: ActivatedRoute,
    private memebersearch: MemberSearch,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id, "Page Id");
    this.memberdata
      .getMembersListById(this.id)
      .subscribe((data: MemberData) => {
        this.member = data;
        console.log(this.member, "Member Summary PAGE");
      });
  }
}

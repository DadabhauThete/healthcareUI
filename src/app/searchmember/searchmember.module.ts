import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchmemberRoutingModule } from './searchmember-routing.module';
import { SearchmemberComponent } from './searchmember/searchmember.component';


@NgModule({
  declarations: [
    SearchmemberComponent
  ],
  imports: [
    CommonModule,
    SearchmemberRoutingModule
  ]
})
export class SearchmemberModule { }

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GlobalStore} from "../../store/global.store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private globalStore: GlobalStore
  ) { }

  ngOnInit(): void {
    this.globalStore.currentActiveUrl = ''
  }

}

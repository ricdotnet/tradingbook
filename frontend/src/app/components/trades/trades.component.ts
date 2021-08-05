import { Component, OnInit } from '@angular/core';
import {TradeService} from "../../services/trade/trade.service";
import {TradeInterface} from "../../interfaces/trade.interface";
import {ActivatedRoute} from "@angular/router";
import {GlobalStore} from "../../store/global.store";
import {SubscribeService} from "../../services/subscribe/subscribe.service";

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html'
})
export class TradesComponent implements OnInit {

  trades: TradeInterface[] = []

  constructor(
    private tradeService: TradeService,
    private activatedRoute: ActivatedRoute,
    private globalStore: GlobalStore
  ) {
  }

  ngOnInit(): void {
    this.getTrades()

    this.activatedRoute.url.subscribe(
      url => {
        this.globalStore.currentActiveUrl = url[0].path
      }
    )
  }

  getTrades() {
    this.tradeService.getTrades().subscribe(result => this.trades = result)
  }

}
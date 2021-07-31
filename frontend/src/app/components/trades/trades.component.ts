import { Component, OnInit } from '@angular/core';
import {TradeService} from "../../services/trade/trade.service";
import {TradeInterface} from "../../interfaces/trade.interface";

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html'
})
export class TradesComponent implements OnInit {

  trades: TradeInterface[] = []

  constructor(private tradeService: TradeService) { }

  ngOnInit(): void {
    this.getTrades()
  }

  getTrades() {
    this.tradeService.getTrades().subscribe(result => this.trades = result)
  }

}
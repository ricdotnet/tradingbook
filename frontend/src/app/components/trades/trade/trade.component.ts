import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
})
export class TradeComponent implements OnInit {

  constructor() { }

  @Input() tradeId: string = ''

  ngOnInit(): void {
  }

}

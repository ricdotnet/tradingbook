import {Component, OnInit} from '@angular/core';
import {TradeService} from "../../services/trade/trade.service";
import {TradeInterface} from "../../interfaces/trade.interface";
import {ActivatedRoute} from "@angular/router";
import {GlobalStore} from "../../store/global.store";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Listeners} from "../../utils/listeners";

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html'
})
export class TradesComponent implements OnInit {

  trades: TradeInterface[] = []

  _loading: boolean = false
  _newTrade: boolean = false
  tradeForm: FormGroup

  constructor(
    private tradeService: TradeService,
    private activatedRoute: ActivatedRoute,
    private globalStore: GlobalStore,
    private tf: FormBuilder,
    private listeners: Listeners
  ) {
    this.tradeForm = tf.group({
      pairName: <string>'',
      entry: <number>0,
      exit: <number>0,
      type: <string>'Long'
    })

    listeners.useDOMEvent({
      event: 'keyup',
      func: (e: KeyboardEvent) => {
        if(e.key === 'Escape' && this._newTrade){
          this.closeModal()
        }
      }
    });
  }

  ngOnInit(): void {
    this._loading = true
    this.getTrades()

    this.activatedRoute.url.subscribe(
      url => {
        this.globalStore.currentActiveUrl = url[0].path
      }
    )
  }

  getTrades() {
    this.tradeService.getTrades().subscribe(
      (result) => {
        this.trades = result.trades
        this._loading = false
      },
      () => {
      }
    )
  }

  addTrade() {
    this.tradeService.addTrade(this.tradeForm.value).subscribe(
      () => this.getTrades()
    )
  }

  openModal() {
    this._newTrade = true
  }

  closeModal() {
    this._newTrade = false
  }

}
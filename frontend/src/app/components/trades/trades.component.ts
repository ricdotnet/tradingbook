import {Component, OnInit} from '@angular/core';
import {TradeInterface} from "../../interfaces/trade.interface";
import {ActivatedRoute} from "@angular/router";
import {GlobalStore} from "../../store/global.store";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Listeners} from "../../utils/listeners";
import {HttpHeaders} from "@angular/common/http";
import {Config} from "../../utils/config";
import {ToastService} from "../../services/toast/toast.service";

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
    private activatedRoute: ActivatedRoute,
    private globalStore: GlobalStore,
    private tf: FormBuilder,
    private listeners: Listeners,
    private toastService: ToastService
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
        if (e.key === 'Escape' && this._newTrade) {
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
    this.listeners.get({
      uri: 'trade/all',
      headers: new HttpHeaders({'authorization': `Bearer ${Config.currentUserToken}`})
    }).subscribe(
      (_: any) => {
        this.trades = _.trades
        this._loading = false
      },
      (err) => {
        this.toastService.toast(err.error.message, 'error', 10000)
      }
    )
  }

  addTrade() {

    if (!this.tradeForm.value.pairName.trim())
      return this.toastService.toast('Please enter a pair.', 'error', 10000)

    if (!this.tradeForm.value.entry)
      return this.toastService.toast('Your trade needs to have an entry value.', 'error', 10000)

    this.listeners.post({
      uri: 'trade/add',
      body: this.tradeForm.value,
      headers: new HttpHeaders({'authorization': `Bearer ${Config.currentUserToken}`}),
    }).subscribe(
      _ => {
        this.getTrades()
      },
      (err) => {
        this.toastService.toast(err.error.message, 'error', 10000)
      }
    )
  }


  openModal() {
    this._newTrade = true
  }

  closeModal() {
    this._newTrade = false
  }

}
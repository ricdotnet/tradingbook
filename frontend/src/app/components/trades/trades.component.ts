import {Component, OnInit} from '@angular/core';
import {TradeInterface} from "../../interfaces/trade.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalStore} from "../../store/global.store";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Listeners} from "../../utils/listeners";
import {HttpHeaders} from "@angular/common/http";
import {Config} from "../../utils/config";
import {ToastService} from "../../services/toast/toast.service";
import * as _ from "lodash"

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html'
})
export class TradesComponent implements OnInit {

  trades: TradeInterface[] = []

  _loading: boolean = false
  _tableLoading: boolean = false

  _newTrade: boolean = false
  _pageNumber: number = 1
  _pages: number = 1
  _take: number = 10
  _search: string = ''
  tradeForm: FormGroup
  filtersForm: FormGroup

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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

    this.filtersForm = tf.group({
      take: <number>10,
      search: <string>''
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

    this.getPageNumber()
  }

  getTrades() {
    this.getPageNumber()
    this.listeners.get({
      uri: `trade/all?page=${this._pageNumber}&take=${this._take}&pair=${this._search}`,
      headers: new HttpHeaders({'authorization': `Bearer ${Config.currentUserToken}`})
    }).subscribe(
      (_: any) => {
        this.trades = _.trades
        this._pages = Math.ceil(_.count / this._take)
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

  /**
   * Pagination Helpers
   */
  navigateTo(event: string) {
    if (event === 'increase') {
      this._pageNumber++
    } else if (event === 'decrease') {
      this._pageNumber--
    } else {
      this._pageNumber = parseInt(event)
    }

    if (this._pageNumber <= 1 || isNaN(this._pageNumber)) {
      this.resetPage()
    } else {
      this.router.navigate([this.globalStore.currentActiveUrl], {queryParams: {page: this._pageNumber}})
        .then(() => {
          this.getTrades()
        })
    }
  }

  getPageNumber() {
    this.activatedRoute.queryParams.subscribe(
      _ => this._pageNumber = _.page
    )

    // if(this._pageNumber < 0)
    //   this.resetPage()

    if (this._pageNumber <= 1 || !this._pageNumber)
      this._pageNumber = 1

    // if(this._pageNumber > this._pages)
    //   this.resetPage()
  }

  resetPage() {
    this.router.navigate([this.globalStore.currentActiveUrl]).then(() => {
      // reset the page number to 1
      // temp quick fix
      this._pageNumber = 1
      this.getTrades()
    })
  }

  setTake() {
    this._take = this.filtersForm.value.take
    this.getTrades()
  }

  private debouncing: boolean = false
  setSearchTerm() {
    // _.debounce(this.getTrades, 500)


    if (!this.debouncing) {

      if(!this.filtersForm.value.search || this.filtersForm.value.search === '')
        return;

      this._tableLoading = true
      this.debouncing = true
      setTimeout(() => {
        this._search = this.filtersForm.value.search
        this.getTrades()
        this.debouncing = false
        this._tableLoading = false
        this.resetPage()
      }, 500)
    }
  }

}
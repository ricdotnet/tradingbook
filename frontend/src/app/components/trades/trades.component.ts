import {Component, OnInit} from '@angular/core';
import {TradeInterface} from "../../interfaces/trade.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalStore} from "../../store/global.store";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Listeners} from "../../utils/listeners";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Config} from "../../utils/config";
import {ToastService} from "../../services/toast/toast.service";
import {Helpers} from '../../utils/helpers'

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
  _search: string | undefined
  tradeForm: FormGroup
  filtersForm: FormGroup

  _tradeId: string = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private globalStore: GlobalStore,
    private tf: FormBuilder,
    private listeners: Listeners,
    private toastService: ToastService,
    private helpers: Helpers
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

    this.keyEvents()
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

    // I want this to be on the request uri only when there is a pair being looked up
    // let pair = (this._search) ? `'pair', ${this._search}` : '';
    // the above line got deprecated because I can use the HttpParams class

    let params = new HttpParams()
      .append('page', this._pageNumber)
      .append('take', this._take)

    if (this._search)
      params = params.append('pair', this._search)

    this.listeners.get({
      // uri: `trade/all?page=${this._pageNumber}&take=${this._take}${pair}`,
      uri: `trade/all`,
      headers: new HttpHeaders({'authorization': `Bearer ${Config.currentUserToken}`}),
      parameters: params
    }).subscribe(
      (_: any) => {
        this.trades = _.trades
        this._pages = Math.ceil(_.count / this._take!)
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

  /**
   * Pagination Helpers
   */
  navigateTo(event: string) {

    switch (event) {
      case 'first':
        this._pageNumber = 1
        break;
      case 'last':
        this._pageNumber = this._pages
        break;
      case 'increase':
        this._pageNumber++
        break;
      case 'decrease':
        this._pageNumber--;
        break;
      default:
        this._pageNumber = +event;
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

    if (!this.debouncing) {

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

  tradeStatus(type: string, entry: number, exit?: number) {
    return this.helpers.tradeStatus(type, entry, exit)
  }

  /**
   * Modals
   */
  viewTrade(trade: string) {
    this._tradeId = trade
  }

  newTrade() {
    this._newTrade = true
  }

  /**
   * Key events
   */
  keyEvents() {
    let newTrade = {
      event: 'keyup',
      func: (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this._newTrade) {
          this._newTrade = false
        }
      }
    }

    let viewTrade = {
      event: 'keyup',
      func: (e: KeyboardEvent) => {
        if(e.key === 'Escape') {
          this._tradeId = ''
        }
      }
    }

    let mouseEvent = {
      event: 'mousedown',
      func: (e: MouseEvent) => {
        let target = <Target><unknown>e.target
        if(target.id === 'modal-out') {
          if(this._newTrade) this._newTrade = false
          if(this._tradeId !== '') this._tradeId = ''
        }
      }
    }

    this.listeners.useDOMEvent([newTrade, viewTrade, mouseEvent]);
  }

}

interface Target {
  id: Object
}
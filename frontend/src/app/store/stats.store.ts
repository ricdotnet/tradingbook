import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StatsStore {

  private _trades: number
  private _topPair: string
  private _topPairCount: number
  private _pipsWon: number
  private _pipsLost: number
  private _wins: number
  private _losses: number
  private _open: number

  constructor() {
    this._trades = 0
    this._topPair = ''
    this._topPairCount = 0
    this._pipsWon = 0
    this._pipsLost = 0
    this._wins = 0
    this._losses = 0
    this._open = 0
  }

  set trades(trades: number) {
    this._trades = trades
  }
  get trades() {
    return this._trades
  }

  set topPair(topPair: string) {
    this._topPair = topPair
  }
  get topPair() {
    return this._topPair
  }

  set topPairCount(topPairCount: number) {
    this._topPairCount = topPairCount
  }
  get topPairCount() {
    return this._topPairCount
  }

  set pipsWon(pipsWon: number) {
    this._pipsWon = pipsWon
  }
  get pipsWon() {
    return this._pipsWon
  }

  set pipsLost(pipsLost: number) {
    this._pipsLost = pipsLost
  }
  get pipsLost() {
    return this._pipsLost
  }

  set wins(wins: number) {
    this._wins = wins
  }
  get wins() {
    return this._wins
  }

  set losses(losses: number) {
    this._losses = losses
  }
  get losses() {
    return this._losses
  }

  set open(open: number) {
    this._open = open
  }
  get open() {
    return this._open
  }
}
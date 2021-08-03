import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StatsStore {

  private _count: number
  private _topPair: string
  private _pipsWon: number
  private _pipsLost: number

  constructor() {
    this._count = 0
    this._topPair = ''
    this._pipsWon = 0
    this._pipsLost = 0
  }

  set count(count: number) {
    this._count = count
  }
  get count() {
    return this._count
  }

  set topPair(topPair: string) {
    this._topPair = topPair
  }
  get topPair() {
    return this._topPair
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
}
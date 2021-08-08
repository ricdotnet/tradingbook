import {BodyInterface} from "./body.interface";

export interface User extends BodyInterface<User> {
  userId: string
  username: string
  email: string
  firstName?: string
  lastName?: string
  createdAt: string
}

/*
Graphs and calculations can be done in the frontend.
i.e.: percentage of won and lost or difference of pips (won - lost)
 */

export interface Stats extends BodyInterface<Stats> {
  trades: number //number of placed trades
  topPair: {
    pair: string,
    count: number
  } //most traded pair
  pipsWon: number //pips won to date
  pipsLost: number //pips lost to date
  pair: string
}
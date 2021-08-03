export interface User {
  userId: string
  username: string
  email: string
  firstName: string
  lastName: string
  [key: string]: any
}

/*
Graphs and calculations can be done in the frontend.
i.e.: percentage of won and lost or difference of pips (won - lost)
 */

export interface Stats {
  count: number //number of placed trades
  topPair: string //most traded pair
  pipsWon: number //pips won to date
  pipsLost: number //pips lost to date
}
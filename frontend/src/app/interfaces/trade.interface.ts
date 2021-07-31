export interface TradeInterface {
  tradeId: string
  pairName: string
  entry: number
  exit: number
  createdAt: bigint
  entryImg?: string
  exitImg?: string
  [key: string]: any
  trades: any
}
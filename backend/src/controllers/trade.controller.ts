import {NextFunction, Response} from "express";
import {RequestInterface} from "../interface/request.interface";

import {Trade} from "../entity/Trade";
const trade = new Trade();

export function getAll(req: RequestInterface, res: Response, next: NextFunction) {

}

export function getOne(req: RequestInterface, res: Response, next: NextFunction) {

}

export function addOne(req: RequestInterface, res: Response, next: NextFunction) {
  trade.userId = req.body.userId
  trade.pairName = req.body.pairName
  trade.entry = req.body.entry
  trade.exit = req.body.exit

  if(!trade.userId)
    return res.status(400).send({message: 'User id not provided.'})

  if(!trade.pairName)
    return res.status(400).send({message: 'Pair not provided.'})

  if(!trade.entry)
    return res.status(400).send({message: 'Entry not provided.'})

  if(!trade.exit)
    return res.status(400).send({message: 'Exit not provided.'})

  console.log(trade)
  next()
}

export function updateOne(req: RequestInterface, res: Response, next: NextFunction) {

}

export function deleteOne(req: RequestInterface, res: Response, next: NextFunction) {

}
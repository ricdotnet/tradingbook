import {NextFunction, Response} from "express";
import {RequestInterface} from "../interface/request.interface";

import {getConnection} from "typeorm";

import {Trade} from "../entity/Trade";

const trade = new Trade();

import {Pair} from '../entity/Pair'

export function getAll(req: RequestInterface, res: Response, next: NextFunction) {

}

export function getOne(req: RequestInterface, res: Response, next: NextFunction) {

}

export async function addOne(req: RequestInterface, res: Response, next: NextFunction) {
  trade.userId = req.body.userId
  trade.pairName = req.body.pairName.toLowerCase()
  trade.entry = req.body.entry
  trade.exit = req.body.exit

  if (!trade.userId)
    return res.status(400).send({message: 'User id not provided.'})

  if (!trade.pairName)
    return res.status(400).send({message: 'Pair not provided.'})

  if (!trade.entry)
    return res.status(400).send({message: 'Entry not provided.'})

  if (!trade.exit)
    return res.status(400).send({message: 'Exit not provided.'})

  let pairExists = await getConnection()
    .getRepository(Pair)
    .find({
      where: {
        pairName: trade.pairName
      }
    })

  if(pairExists.length < 1){
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Pair)
      .values({
        pairName: trade.pairName
      })
      .execute()
  }

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Trade)
    .values({
      pairName: trade.pairName,
      entry: trade.entry,
      exit: trade.exit,
      userId: trade.userId
    })
    .execute()

  next()
}

export function updateOne(req: RequestInterface, res: Response, next: NextFunction) {

}

export function deleteOne(req: RequestInterface, res: Response, next: NextFunction) {

}
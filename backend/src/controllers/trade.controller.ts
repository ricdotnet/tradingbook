import {NextFunction, Response} from "express";
import {RequestInterface} from "../interface/request.interface";
import {getConnection} from "typeorm";
import {Trade} from "../entity/Trade";
import {Pair} from '../entity/Pair'

const trade = new Trade();

export async function getAll(req: RequestInterface, res: Response) {
  trade.userId = req.decoded?.userId

  let pageNumber = req.query.page || 1
  let take = req.query.take || 10
  let skip: number

  if(pageNumber === 'undefined' || pageNumber === '1') {
    skip = 0
  } else {
    skip = (<number>pageNumber - 1) * <number>take
  }

  let [trades, count] = await getConnection()
    .getRepository(Trade)
    .createQueryBuilder()
    .where('userId = :id', {id: trade.userId})
    .orderBy('createdAt', 'DESC')
    .skip(skip)
    .take(<number>take)
    .getManyAndCount()

  return res.status(200).send({status: 200, trades, count})
}

export async function getOne(req: RequestInterface, res: Response) {
  trade.tradeId = req.params.id

  let single = await getConnection()
    .getRepository(Trade)
    .findOne({
      where: {
        tradeId: trade.tradeId
      }
    })

  return res.status(200).send({status: 200, single})
}

export async function addOne(req: RequestInterface, res: Response, next: NextFunction) {
  trade.userId = req.decoded?.userId
  trade.pairName = req.body.pairName.toLowerCase()
  trade.entry = req.body.entry
  trade.exit = req.body.exit
  trade.type = req.body.type

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

  if (pairExists.length < 1) {
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
      userId: trade.userId,
      type: trade.type
    })
    .execute()

  next()
}

export function updateOne(req: RequestInterface, res: Response, next: NextFunction) {

}

export async function deleteOne(req: RequestInterface, res: Response, next: NextFunction) {
  trade.tradeId = req.body.tradeId

  if (!trade.tradeId)
    return res.status(400).send({message: 'No Trade Id provided.'})

  let deleted = await getConnection()
    .getRepository(Trade)
    .delete({tradeId: trade.tradeId})

  if (deleted.affected === 0)
    return res.status(200).send({message: 'Nothing was deleted.'})

  next()
}
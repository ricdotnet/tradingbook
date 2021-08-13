import {RequestInterface} from "../interface/request.interface";
import {NextFunction, Response} from "express";
import {getConnection} from "typeorm";
import {Trade} from "../entity/Trade";

export async function getTrades(this: any, req: RequestInterface, res: Response, next: NextFunction) {

  let userId = req.decoded?.userId
  let searchTerm = req.query.pair || ''
  let pageNumber = req.query.page || 1
  let take = req.query.take || 1
  let skip: number

  if (pageNumber === 'undefined' || pageNumber === 1) {
    skip = 0
  } else {
    skip = (<number>pageNumber - 1) * <number>take
  }

  let result = {
    trades: <Trade[]>[],
    count: 0
  }

  if(take !== 1) {
    [result.trades, result.count]= await getConnection()
      .getRepository(Trade)
      .createQueryBuilder()
      .where(`userId = :userId`, {userId: userId})
      .andWhere(`pairName like '%${searchTerm}%'`)
      .orderBy('createdAt', 'DESC')
      .skip(skip)
      .take(<number>take)
      .getManyAndCount()
  } else {
    [result.trades, result.count]= await getConnection()
      .getRepository(Trade)
      .createQueryBuilder()
      .where(`userId = :userId`, {userId: userId})
      .orderBy('createdAt', 'DESC')
      .getManyAndCount()
  }

  req.result = result;

  next()
}
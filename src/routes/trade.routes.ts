import express, {Response} from "express";
import {RequestInterface} from "../interface/request.interface";

import {addOne, deleteOne, getAll, getOne} from "../controllers/trade.controller";
import {getTrades} from "../middlewares/trade.middleware";

export const tradeRoutes = express.Router()

/**
 * Get all your trades
 */
tradeRoutes.get('/all', getTrades, getAll)

/**
 * Get a single trade
 */
tradeRoutes.get('/t/:id', getOne)

/**
 * Add a new trade.
 * Remove a trade.
 * Update a trade.
 * Body will be a json payload
 */
tradeRoutes.post('/add', addOne, (req: RequestInterface, res: Response) => {

  res.status(200).send({status: 200, message: 'Trade added.'})
})
tradeRoutes.patch('/update', (req: RequestInterface, res: Response) => {

  res.status(200).send({status: 200, message: 'updating a trade...'})
})
tradeRoutes.delete('/delete', deleteOne, (req: RequestInterface, res: Response) => {

  res.status(200).send({status: 200, message: 'Trade deleted.'})
})
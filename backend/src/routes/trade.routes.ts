import express, {Response} from "express";
import {RequestInterface} from "../interface/request.interface";

import {addOne} from "../controllers/trade.controller";

const tradeRoutes = express.Router()

/**
 * Get all your trades
 */
tradeRoutes.get('/all', (req: RequestInterface, res: Response) => {

  res.status(200).send({message: 'all trades...'})
})

/**
 * Get a single trade
 */
tradeRoutes.get('/t/:id', (req: RequestInterface, res: Response) => {

  res.status(200).send({message: 'one trade...'})
})

/**
 * Add a new trade.
 * Remove a trade.
 * Update a trade.
 * Body will be a json payload
 */
tradeRoutes.post('/add', addOne, (req: RequestInterface, res: Response) => {

  res.status(200).send({message: 'adding a trade...'})
})
tradeRoutes.patch('/update', (req: RequestInterface, res: Response) => {

  res.status(200).send({message: 'updating a trade...'})
})
tradeRoutes.delete('/delete', (req: RequestInterface, res: Response) => {

  res.status(200).send({message: 'deleting a trade...'})
})

export {tradeRoutes}
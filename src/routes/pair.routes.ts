import express, {Response} from 'express'
import {RequestInterface} from "../interface/request.interface";
import {getConnection} from "typeorm";

export const pairRoutes = express.Router()

//most traded pair endpoint
pairRoutes.get('/mt', (req: RequestInterface, res: Response) => {

})
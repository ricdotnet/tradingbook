import {Response, NextFunction} from "express";
import {RequestInterface} from "../interface/request.interface";
import {decode} from "./token.service";
import {DecodedInterface} from "../interface/decoded.interface";

export function auth(req: RequestInterface, res: Response, next: NextFunction) {
  const bearerHeader: string = req.header('authorization')!
  if(!bearerHeader)
    return res.status(400).send({message: 'No token provided.'})
  //return res.status(400).send({message: 'No bearer/authorization header provided.'})

  let token: string | string[] = bearerHeader.split(' ')
  token = token[1]

  let decoded = decode(token)

  if(!decoded)
    return res.status(400).send({message: 'Invalid token provided.'})

  req.decoded = <DecodedInterface>decoded

  let expiresIn: number | undefined = req.decoded.exp!
  if(expiresIn <= Date.now()/1000) {
    return res.status(401).send({message: 'Token expired.'})
  }

  next()
}
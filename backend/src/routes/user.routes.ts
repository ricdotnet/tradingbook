import express, {Response} from "express";
import {encode, decode} from '../services/token.service'
import {createNewUser, loginExistingUser} from '../controllers/user.controller'

import {RequestInterface} from "../interface/request.interface";

const userRoutes = express.Router();

userRoutes.post('/login', loginExistingUser, (req: RequestInterface, res: Response) => {

  let token: any = encode(req.userId!, req.body.remember)

  res.status(200).send({loggedIn: true, token: token})
});

userRoutes.post('/register', createNewUser, (req: RequestInterface, res: Response) => {
  /**
   * Any necessary last checks before ending the request
   */

  res.status(200).send({message: 'Account registered successfully.'})
})

userRoutes.post('/authenticate', (req: RequestInterface, res: Response) => {

  const bearerHeader: string = req.header('authorization')!
  if(!bearerHeader)
    return res.status(400).send({message: 'No token provided.'})
  //return res.status(400).send({message: 'No bearer/authorization header provided.'})

  let token: string | string[] = bearerHeader.split(' ')
  token = token[1]

  let decoded: Object = decode(token)

  if(!decoded)
    return res.status(400).send({message: 'Invalid token provided.'})

  res.status(200).send(decoded)
})

export {userRoutes}
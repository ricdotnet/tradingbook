import express, {Response} from "express";
import {encode, decode} from '../services/tokenService'
import {createNewUser, loginExistingUser} from '../controllers/userController'

import {RequestInterface} from "../interface/requestInterface";

const userRouter = express.Router();

type user = {
  userId: string,
  username: string,
  password: string,
  email: string
};
type body = JSON;

userRouter.post('/login', loginExistingUser, (req: RequestInterface, res: Response) => {

  let token: any = encode(req.userId!, req.body.remember)

  res.status(200).send({loggedIn: true, token: token})
});

userRouter.post('/register', createNewUser, (req: RequestInterface, res: Response) => {
  /**
   * Any necessary last checks before ending the request
   */

  res.status(200).send({message: 'Account registered successfully.'})
})

userRouter.post('/authenticate', (req: RequestInterface, res: Response) => {

  const bearerHeader: string = req.header('authorization')!
  let token: string | string[] = bearerHeader.split(' ')
  token = token[1]

  let decoded: Object = decode(token)

  if(!decoded)
    return res.status(400).send({message: 'Invalid token provided.'})

  res.status(200).send(decoded)
})

export {userRouter}
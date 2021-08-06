import express, {Response} from "express";
import {encode} from '../services/token.service'
import {
  createNewUser,
  getUserDetails,
  loginExistingUser,
  userStats
} from '../controllers/user.controller'
import {auth} from "../services/auth.service";

import {RequestInterface} from "../interface/request.interface";

export const userRoutes = express.Router();

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

userRoutes.get('/details', auth, getUserDetails, (req: RequestInterface, res: Response) => {
  res.status(200).send(req.body)
})

userRoutes.get('/stats', auth, userStats, (req: RequestInterface, res: Response) => {
  res.status(200).send(req.body)
})

userRoutes.post('/authenticate', auth, (req: RequestInterface, res: Response) => {

  if (req.decoded) {
    res.status(200).send(req.decoded)
  }
})
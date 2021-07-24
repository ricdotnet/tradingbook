import express, {Request, Response} from "express";
import {encode} from '../services/tokenService'
import {createNewUser, loginExistingUser} from '../controllers/userController'

import {UserInterface} from "../interface/userInterface";

const userRouter = express.Router();

type user = {
  userId: string,
  username: string,
  password: string,
  email: string
};
type body = JSON;

userRouter.post('/login', loginExistingUser, (req: UserInterface, res: Response) => {

  let token: any = encode(req.userId!, true)

  res.status(200).send({loggedIn: true, token: token})
});

userRouter.post('/register', createNewUser, (req: Request, res: Response) => {
  /**
   * Any necessary last checks before ending the request
   */

  res.status(200).send({message: 'Account registered successfully.'})
})

export {userRouter}
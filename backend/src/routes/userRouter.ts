import express, {Request, Response} from "express";
import {encode} from '../services/tokenService'
import {createNewUser, loginExistingUser} from '../controllers/userController'
import {randomUUID} from "crypto";

const userRouter = express.Router();

type user = {
  userId: string,
  username: string,
  password: string,
  email: string
};
type body = JSON;

userRouter.post('/login', loginExistingUser, (req: Request, res: Response) => {

  // let token: any = encode(userId, true)

  res.status(200).send({message: 'logged in'})
});

userRouter.post('/register', createNewUser, (req: Request, res: Response) => {

  let username: user['username'] = req.body.username
  let password: user['password'] = req.body.password
  let email: user['email'] = req.body.email

  let user: user = {
    userId: randomUUID(),
    username: username,
    password: password,
    email: email
  }

  res.status(200).send({message: 'registered'})
})

export {userRouter}
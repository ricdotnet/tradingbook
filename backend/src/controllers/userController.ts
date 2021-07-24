import {Request, Response, NextFunction} from "express";

import {getConnection} from "typeorm";
import {User} from "../entity/User";

import {RequestInterface} from "../interface/requestInterface";

export async function createNewUser(req: Request, res: Response, next: NextFunction) {

  let username: string = req.body.username
  let password: string = req.body.password
  let email: string = req.body.email

  if(!username)
    return res.status(400).send({message: 'Please enter a username.'})

  if(!password)
    return res.status(400).send({message: 'Please enter a password.'})

  if(!email)
    return res.status(400).send({message: 'Please enter an email address.'})

  let usernameExists: number = await getConnection()
    .getRepository(User)
    .createQueryBuilder( 'user')
    .where('user.username = :username', {username: username})
    .getCount()

  if(usernameExists > 0) {
    return res.status(400).send({ message: 'Username already registered.'})
  }

  let emailExists: number = await getConnection()
    .getRepository(User)
    .createQueryBuilder('user')
    .where('user.email = :email', {email: email})
    .getCount()

  if(emailExists > 0) {
    return res.status(400).send({message: 'Email already registered.'})
  }

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      username: username,
      password: password,
      email: email
    })
    .execute()

  next()
}

export async function loginExistingUser(req: RequestInterface, res: Response, next: NextFunction) {

  let username: string = req.body.username
  let password: string = req.body.password

  if(!username)
    return res.status(400).send({message: 'Please enter a username.'})

  if(!password)
    return res.status(400).send({message: 'Please enter a password.'})

  /**
   * TODO
   * change this function to be more secure...
   * as it stands it is for test purposes only...
   */

  let user = await getConnection()
    .getRepository(User)
    .createQueryBuilder('user')
    .where('username = :username', {username: username})
    .getOne()

  if(!user)
    return res.status(400).send({message: 'No user found with those details.'})

  if(password !== user.password)
    return res.status(400).send({message: 'Wrong password.'})

  req.userId = user.userId

  next()
}
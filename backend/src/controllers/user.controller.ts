import {Response, NextFunction} from "express";

import {getConnection} from "typeorm";
import {User} from "../entity/User";

const user = new User()

import {RequestInterface} from "../interface/request.interface";

export async function createNewUser(req: RequestInterface, res: Response, next: NextFunction) {

  // let username: string = req.body.username
  // let password: string = req.body.password
  // let email: string = req.body.email

  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;

  if (!user.username)
    return res.status(400).send({message: 'Please enter a username.'})

  if (!user.password)
    return res.status(400).send({message: 'Please enter a password.'})

  if (!user.email)
    return res.status(400).send({message: 'Please enter an email address.'})

  let usernameExists: number = await getConnection()
    .getRepository(User)
    .createQueryBuilder('user')
    .where('user.username = :username', {username: user.username})
    .getCount()

  if (usernameExists > 0) {
    return res.status(400).send({message: 'Username already registered.'})
  }

  let emailExists: number = await getConnection()
    .getRepository(User)
    .createQueryBuilder('user')
    .where('user.email = :email', {email: user.email})
    .getCount()

  if (emailExists > 0) {
    return res.status(400).send({message: 'Email already registered.'})
  }

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      username: user.username,
      password: user.password,
      email: user.email
    })
    .execute()

  next()
}

export async function loginExistingUser(req: RequestInterface, res: Response, next: NextFunction) {

  user.username = req.body.username
  user.password = req.body.password

  if (!user.username)
    return res.status(400).send({message: 'Please enter a username.'})

  if (!user.password)
    return res.status(400).send({message: 'Please enter a password.'})

  /**
   * TODO
   * change this function to be more secure...
   * as it stands it is for test purposes only...
   */

  let curUser = await getConnection()
    .getRepository(User)
    .createQueryBuilder('user')
    .where('username = :username', {username: user.username})
    .getOne()

  if (!curUser)
    return res.status(400).send({message: 'No user found with those details.'})

  if (user.password !== curUser.password)
    return res.status(400).send({message: 'Wrong password.'})

  req.userId = curUser.userId

  next()
}
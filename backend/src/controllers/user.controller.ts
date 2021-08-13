import {Response, NextFunction} from "express";
import {getConnection} from "typeorm";
import {RequestInterface} from "../interface/request.interface";
import {User} from "../entity/User";
import {Trade} from "../entity/Trade";
import * as _ from 'lodash'

const user = new User()

export async function createNewUser(req: RequestInterface, res: Response, next: NextFunction) {

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
    .createQueryBuilder()
    .where('username = :username', {username: user.username})
    .getOne()

  if (!curUser)
    return res.status(400).send({message: 'No user found with those details.'})

  if (user.password !== curUser.password)
    return res.status(400).send({message: 'Wrong password.'})

  req.userId = curUser.userId

  next()
}

export async function getUserDetails(req: RequestInterface, res: Response, next: NextFunction) {
  let userId: string = req.decoded!.userId

  if (!userId) {
    return res.status(400).send({message: 'No user identification present in this token.'})
  }

  req.body = await getConnection()
    .getRepository(User)
    .createQueryBuilder()
    .select(['userId', 'username', 'email', 'firstName', 'lastName', 'createdAt'])
    .where('userId = :id', {id: userId})
    .getRawOne()

  next()
}

export async function userStats(req: RequestInterface, res: Response, next: NextFunction) {
  let userId: string = req.decoded?.userId

  if (!userId) {
    return res.status(400).send({message: 'No user identification present in this token.'})
  }

  let trades = req.result.trades

  let pipsLost = _.reduce(trades, (acc, count) => {
    let entry = count.entry;
    let exit = count.exit;

    if (entry > exit)
      acc += (entry - exit) * 10000

    return acc;
  }, 0)

  let pipsWon = _.reduce(trades, (acc, count) => {
    let entry = count.entry;
    let exit = count.exit;

    if (entry < exit)
      acc += (exit - entry) * 10000

    return acc;
  }, 0)

  let pairsCount = _.countBy(trades, 'pairName')
  let topPair = () => {
    let tempCount = 0
    let tempPair
    for (let [key, value] of Object.entries(pairsCount)) {
      if (value > tempCount) {
        tempCount = value;
        tempPair = key
      }
    }

    return {pair: tempPair, count: tempCount} as Object;
  }

  let results = {
    wins: 0,
    losses: 0,
    open: 0
  }

  trades.map((el: { entry: number; exit: number; type: string; }) => {
    if(((el.entry < el.exit && el.type === 'Long') || (el.entry > el.exit && el.type === 'Short')) && el.exit > 0) {
      results.wins++;
    } else if(el.exit > 0) {
      results.losses++;
    } else {
      results.open++;
    }
  })

  req.body = {
    trades: trades.length,
    topPair: topPair(),
    pipsWon: Math.round(pipsWon),
    pipsLost: Math.round(pipsLost),
    results: results
  }

  next()
}

export async function saveUserDetails(req: RequestInterface, res: Response, next: NextFunction) {
  let userId: string = req.decoded!.userId

  if (!userId) {
    return res.status(400).send({message: 'No user identification present in this token.'})
  }

  let firstName: string = req.body.firstName
  let lastName: string = req.body.lastName

  let update = await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({
      firstName: firstName,
      lastName: lastName
    })
    .where('userId = :id', {id: userId})
    .execute()

  next()
}
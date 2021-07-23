import {Request, Response, NextFunction} from "express";

function exists(type: string, value: string): boolean {

  if (type === 'username') {
    return value === process.env.USERNAME
  }

  if (type === 'email') {
    return value === process.env.EMAIL
  }

  if(type === 'password') {
    return value === process.env.PASSWORD
  }

  return true;
}

export function createNewUser(req: Request, res: Response, next: NextFunction) {

  if (exists('username', req.body.username))
    return res.status(400).send({message: 'username exists'})

  if (exists('email', req.body.email))
    return res.status(400).send({message: 'email exists'})

  next()
}

export function loginExistingUser(req: Request, res: Response, next: NextFunction) {
  if (!exists('username', req.body.username)) {
    return res.status(400).send({message: 'username does not exist'})
  }

  if(!exists('password', req.body.password)) {
    return res.status(400).send({message: 'your password is wrong'})
  }

  next()
}
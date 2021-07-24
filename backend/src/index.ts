/**
 * Required External Modules
 */
import "reflect-metadata";
import {createConnection} from "typeorm";

import * as dotenv from 'dotenv'
import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import helmet from 'helmet'

import {router} from "./routes/router";

dotenv.config()

/**
 * App Variables
 */
const PORT: number = parseInt(process.env.PORT as string) || 3000;
const APP: express.Express = express()

/**
 * App Configuration
 */
// APP.use(bodyParser.urlencoded({ extended: false }))
// APP.use(bodyParser.json())
APP.use(express.json())
APP.use(helmet())
APP.use(cors())

APP.use(router)

/**
 * Server Activation
 */
APP.listen(PORT, async () => {
  try {
    let connection = await createConnection();
    if (connection)
      console.log('Database connected...')
    console.log('Server running on port: ' + PORT)
  } catch (e) {
    console.log(e)
  }
})
//
//
// import {createConnection} from "typeorm";
// import {User} from "./entity/User";
//
// createConnection().then(async connection => {
//
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);
//
//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);
//
//     console.log("Here you can setup and run express/koa/any other framework.");
//
// }).catch(error => console.log(error));

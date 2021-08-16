/**
 * Required External Modules
 */
import "reflect-metadata";
import {createConnection} from "typeorm";

import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import {routes} from "./routes/routes";
import {RequestInterface} from "./interface/request.interface";

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
APP.use(morgan('dev'))

APP.use('/avatar', express.static('uploads/avatar'))
APP.use('/trade/img', express.static('uploads/trades'))
APP.use(routes)

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
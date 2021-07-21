/**
 * Required External Modules
 */
import * as dotenv from 'dotenv'
import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import helmet from 'helmet'

import {tradeRouter} from "./routes/tradeRouter";

dotenv.config()

/**
 * App Variables
 */
const PORT: number = parseInt(process.env.PORT as string) || 3000;
const APP: express.Express = express()

/**
 *  App Configuration
 */
// APP.use(bodyParser.urlencoded({ extended: false }))
// APP.use(bodyParser.json())
APP.use(express.json())
APP.use(helmet())
APP.use(cors())

APP.use('/trades', tradeRouter)

/**
 * Server Activation
 */
APP.listen(PORT, () => {
	console.log('Server running on port: ' + PORT)
})
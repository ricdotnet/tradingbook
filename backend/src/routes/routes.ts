import express from "express";

const routes: express.Router = express.Router();

import multer from "multer";
let formBody = multer({
  dest: 'uploads/'
})

/**
 * Define routes imports
 */
import {userRoutes} from "./user.routes";
import {tradeRoutes} from "./trade.routes";
import {pairRoutes} from "./pair.routes";

import {auth} from "../services/auth.service";

/**
 * Define main routes
 */
routes.use('/user', formBody.any(), userRoutes)
routes.use('/trade', auth, tradeRoutes)
routes.use('/pair', pairRoutes)


import {testRoutes} from "./test.routes";
routes.use('/test', testRoutes)

export {routes}
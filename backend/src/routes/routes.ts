import express from "express";

const routes: express.Router = express.Router();

/**
 * Define routes imports
 */
import {userRoutes} from "./user.routes";
import {tradeRoutes} from "./trade.routes";

/**
 * Define main routes
 */
routes.use('/user', userRoutes)
routes.use('/trade', tradeRoutes)



import {testRoutes} from "./test.routes";
routes.use('/test', testRoutes)

export {routes}
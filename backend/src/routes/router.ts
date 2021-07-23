import express from "express";

const router: express.Router = express.Router();

/**
 * Define router imports
 */
import {userRouter} from "./userRouter";

/**
 * Define main routes
 */
router.use('/user', userRouter)

export {router}
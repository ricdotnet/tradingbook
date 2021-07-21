import express from "express";

const router: express.Router = express.Router();

import {tradeRouter} from "./tradeRouter";

router.use('/trades', tradeRouter)

export {router}
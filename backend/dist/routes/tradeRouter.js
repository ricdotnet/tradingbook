"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradeRouter = void 0;
const express_1 = __importDefault(require("express"));
const tokenService_1 = require("../service/tokenService");
const tradeRouter = express_1.default.Router();
exports.tradeRouter = tradeRouter;
tradeRouter.get('/', tokenService_1.encode, (req, res) => {
    let body = req.body;
    res.status(200).send(body);
});

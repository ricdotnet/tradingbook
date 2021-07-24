"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function encode(req, res, next) {
    let username = req.body.user.username;
    if (!username) {
        res.status(404).send({ error: 'no username sent?' });
    }
    let token = jsonwebtoken_1.default.sign(username, process.env.SECRET, {
        expiresIn: 3600 * 24,
        algorithm: "HS256"
    });
    console.log(token);
    next();
}
exports.encode = encode;

import jwt from 'jsonwebtoken'
import {DecodedInterface} from "../interface/decoded.interface";

export function encode(userId: string, remember: boolean): string {
  return jwt.sign({userId: userId}, process.env.SECRET!, {
    expiresIn: (remember) ? 3600 * 24 * 365 : 60 * 1, //15,
    algorithm: "HS256"
  });
}

export function decode(token: string): Object {
  return <DecodedInterface>jwt.decode(token);
}
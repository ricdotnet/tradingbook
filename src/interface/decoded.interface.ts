import {JwtPayload} from "jsonwebtoken";

export interface DecodedInterface extends JwtPayload{
  [key: string]: any
}
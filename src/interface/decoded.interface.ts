import {JwtPayload} from "jsonwebtoken";

export interface DecodedInterface extends JwtPayload{
  userId: string
}
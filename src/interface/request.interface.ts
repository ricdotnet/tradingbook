import {Request} from "express";
import {DecodedInterface} from "./decoded.interface";

/**
 * I created an interface extending request because I want to pass a userId variable from the
 * controller to the main route itself;
 */
export interface RequestInterface extends Request {
  decoded?: DecodedInterface
  [key: string]: any
}
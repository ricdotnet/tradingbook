import {Request} from "express";

/**
 * I created an interface extending request because I want to pass a userId variable from the
 * controller to the main route itself;
 */
export interface UserInterface extends Request {
  userId?: string
}
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "./user";
declare global {
  namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}

import { User } from "@prisma/client";

export interface ISignin {
  email: string;
  password: string;
}
export interface ISigninResponse {
  accessToken: string;
  message: string;
}

export interface ISignupResponseType {
  data: Omit<User, "password">;
  accessToken: string;
}

import bcrypt from "bcrypt";
import createError from "http-errors";
import { prisma } from "../../../shared/prisma";
import { jwtHelper } from "../../../shared/jwt";
import envConfig from "../../../envConfig";
import { Secret } from "jsonwebtoken";
import { User } from "@prisma/client";
import { excludeField } from "../../../utils";

const signinUser = async (payload: { email: string; password: string }) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!isUserExist) {
    throw new createError.NotFound("wrong credentials");
  }

  const isPasswordMatched = bcrypt.compareSync(
    payload.password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new createError.NotFound("wrong credentials");
  }

  const accessToken = jwtHelper.createToken(
    {
      email: isUserExist.email,
      id: isUserExist.id,
    },

    envConfig.jwt.jwt_secret as Secret,
    envConfig.jwt.jwt_expireIn as string
  );

  return {
    accessToken,
    message: "user login successful",
  };
};

const signupUser = async (payload: User): Promise<Omit<User, "password">> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExist) {
    throw new createError.BadRequest("user already exist");
  }

  // password hashed
  const hashPassword = bcrypt.hashSync(
    payload.password,
    Number(envConfig.bcryptSoltRound)
  );
  payload.password = hashPassword;

  const result = await prisma.user.create({
    data: payload,
  });

  // remove password after user created successfully
  const userWithoutPassword = excludeField(result, ["password"]);

  return userWithoutPassword;
};

export const authService = {
  signinUser,
  signupUser,
};

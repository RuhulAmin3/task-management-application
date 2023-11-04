import { User } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import createError from "http-errors";
import bcrypt from "bcrypt";
import envConfig from "../../../envConfig";
import { excludeField } from "../../../utils";

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

export const userService = {
  signupUser,
};

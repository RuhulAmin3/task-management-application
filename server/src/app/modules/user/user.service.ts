import { User } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const createUser = async (payload: User) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExist) {
    throw new Error("User already exist");
  }

  const result = await prisma.user.create({
    data: payload,
  });

  return result;
};

export const userService = {
  createUser,
};

import { z } from "zod";

const createUser = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "first name is required",
    }),
    lastName: z.string({
      required_error: "last name is required",
    }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email({ message: "provide a valid email" }),
    password: z.string({
      required_error: "password is required",
    }),
  }),
});

export const userValidation = {
  createUser,
};

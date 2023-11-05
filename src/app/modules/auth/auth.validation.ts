import { z } from "zod";

const signupUser = z.object({
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

const signinUser = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "email is required",
      })
      .email({ message: "provide valid email" }),
    password: z.string({
      required_error: "password is required",
    }),
  }),
});

export const authValidation = {
  signupUser,
  signinUser,
};

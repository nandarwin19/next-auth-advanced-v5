import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .regex(
      new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&]).{8,32}"),
      {
        message:
          "Password must contain one uppercase letter, one lowercase letter, one number and one of the following characters: * . ! @ $ % &",
      }
    ),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

import { z } from "zod";
import errorMap from "zod/lib/locales/en";

export const validationSchemaUser = z
  .object({
    name: z.string().nonempty(),
    email: z.string().email({ message: "Please prove a valid email" }),
    password: z.string().min(3).max(8),
    confirmPassword: z.string().min(3).max(8),
    fruits: z.object(
      { value: z.string() },
      {
        invalid_type_error: "Selection is required !",
        required_error: "Please make a selection",
      }
    ),
    multiFruits: z
      .object(
        { value: z.string() },
        { required_error: "Please make a selection" }
      )
      .array()
      .nonempty({ message: "Selection is required !" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ValidationSchema = z.infer<typeof validationSchemaUser>;

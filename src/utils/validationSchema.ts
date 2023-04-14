import { z } from 'zod'

// login schema
export const registerUserSchema = z
  .object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email({ message: 'Please prove a valid email' }),
    password: z
      .string()
      .min(3)
      .max(8),
    confirmPassword: z
      .string()
      .min(3)
      .max(8)
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export type RegisterUserInput = z.infer<typeof registerUserSchema>

// login schema
export const loginUserSchema = z.object({
  email: z.string().email({ message: 'Please prove a valid email' }),
  password: z
    .string()
    .min(3)
    .max(8)
})
export type LoginUserInput = z.infer<typeof loginUserSchema>

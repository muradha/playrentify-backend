import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const baseAuthSchema = z.object({
    email: z.string().email().trim().min(1),
    password: z.string().min(8)
})

const registerSchema = baseAuthSchema.extend({
    username: z.string().trim().min(1, { message: "Name is required" }),
})


// class is required for using DTO as a type
export class LoginDto extends createZodDto(baseAuthSchema) { }
export class SignUpDto extends createZodDto(registerSchema) { }
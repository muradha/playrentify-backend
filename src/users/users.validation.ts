import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const baseUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

const createUserSchema = baseUserSchema.extend({
    name: z.string().trim().min(1, { message: "Name is required" }),
})

const updateUserSchema = baseUserSchema.extend({
    name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }),
})

// class is required for using DTO as a type
export class CreateUserDto extends createZodDto(createUserSchema) { }
export class UpdateUserDto extends createZodDto(updateUserSchema) { }
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const baseUserSchema = z.object({
    status: z.enum(['READY', 'MAINTENANCE', 'RENTED'], { required_error: "Status is required", message: 'Status is READY | MAINTENANCE | RENTED' }),
})

const createUnitSchema = baseUserSchema.extend({
    name: z.string().trim().min(1, { message: "Name is required" }),
})

const updateUnitSchema = baseUserSchema.extend({
    name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }),
})

// class is required for using DTO as a type
export class CreateUnitDto extends createZodDto(createUnitSchema) { }
export class UpdateUnitDto extends createZodDto(updateUnitSchema) { }
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const baseRentalSessionSchema = z.object({
    status: z.enum(['ACTIVE', 'COMPLETED', 'EXTENDED'], { required_error: "Status is required", message: 'Status is ACTIVE | COMPLETED | EXTENDED' }),
})

const createRentalSessionSchema = baseRentalSessionSchema.extend({
    end_time: z.date(),
    user_id: z.number().min(1),
    unit_id: z.number().min(1),
})

const updateRentalSessionSchema = baseRentalSessionSchema.extend({
    end_time: z.date(),
    user_id: z.number().min(1),
    unit_id: z.number().min(1),
})

// class is required for using DTO as a type
export class CreateRentalSessionDto extends createZodDto(createRentalSessionSchema) { }
export class UpdateRentalSessionDto extends createZodDto(updateRentalSessionSchema) { }
import {z}from'zod'

const userZodSchema = z.object({
    body:z.object({
        name:z.string().optional(),
        email:z.string({
            required_error:'Email is required'
        }),
        password:z.string({
            required_error:'password is required'
        }),
        role:z.enum(['addmin','buyer','seller'],{
            required_error:'Role is required'
        }),
        phone:z.string({
            required_error:'Phone number is required',
        }),
        image:z.string(),
        address: z.string()
    })
})
export const userZodSchemaValidation = {
    userZodSchema
}
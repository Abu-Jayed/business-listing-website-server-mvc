import {z}from'zod'
//login validation data
 const logingValidationZodSchema = z.object({
    body: z.object({
        email: z.string({
            required_error:'Email is required'
        }),
        password:z.string({
            required_error:'password is required'
        })
    })
 })

 // refresh token zod schema 
 const refreshTokenValidationZodSchema  = z.object({
    cookies:z.object({
        refreshToken: z.string({
            required_error:'Refresh token is required'
        })
    })
 })
 export const authValidation = {
    logingValidationZodSchema,
    refreshTokenValidationZodSchema
 }
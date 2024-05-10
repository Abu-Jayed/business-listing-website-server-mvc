import { Request,Response } from "express";
import catchAsync from "../../../shared/catchAsync";

const logingUser = catchAsync(async(req:Request,res:Response)=>{
    const {...loginData} = req.body
    
})
import { Request,Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import {responseForData}from'../../../shared/sendRespons';
import httpStatus from "http-status";
import { Iuser } from "./user.interface";
import { userService } from "./user.service";
import pick from "../../../shared/pick";


// create user
const createUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await userService.createUser(userData);
 
    responseForData.sendResponseForCreate(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created Successful',
    data:result
    });
  });
  //   get all user 
const getAllUser = catchAsync(async(req:Request,res:Response)=>{
    const paginationOption = pick(req.query,[
        'limit',
        'page',
        'sortBy',
        'sortOrder'
    ])
    const result = await userService.getAllUser(paginationOption);
    responseForData.sendResponse<Iuser[]>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Getting Successfull',
        data:result.data,
        meta:result.meta
    })
})
// get single user
const getSingleUser = catchAsync(async(req:Request,res:Response)=>{
    const id = req.params.id;
    const result = await userService.getSingleUser(id)
    responseForData.sendResponseForCreate<Iuser>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Getting succesfull',
        data:result
    })
    
})

// update user 
const updateUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const travelData = req.body;
    const result = await userService.updateUser(id, travelData);
    responseForData.sendResponseForCreate<Iuser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User data Update Successful',
      data: result,
    });
  });
  // delete user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await userService.deleteUser(id);
    responseForData.sendResponseForCreate(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Delete Successful',
      data: result,
    });
  });
  
 
  export const userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,deleteUser
  }
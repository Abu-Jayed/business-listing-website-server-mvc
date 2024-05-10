import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { User } from "../user/user.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";

const loginUser = async(payload:ILoginUser): Promise<ILoginUserResponse>=>{
    const {email,password} = payload
  // check user existance
  const isUserExist = await User.findOne({email},{email:1,password:1,role:1}).lean();
  if(!isUserExist){
    throw new ApiError(httpStatus.NOT_FOUND,"User doesn't exist")
  }
  // check mathched password
  const is
}
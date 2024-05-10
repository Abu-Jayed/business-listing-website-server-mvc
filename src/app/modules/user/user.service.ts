import httpStatus from "http-status";
import { Iuser } from "./user.interface";
import { User } from "./user.model";
import ApiError from "../../../error/ApiError";
import { IPaginationOption } from "../../../shared/pagination";
import { IGenericResponse } from "../../../interfaces/common";
 

//create a user
const createUser = async (user: Iuser) => {
  const isExistUser = await User.findOne({
    email: user.email,
  });
  if (isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "user is already exist");
  }
  const result = await User.create(user);
  return result;
};

// get all user
const getAllUser = async (
  paginationOption: IPaginationOption
): Promise<IGenericResponse<Iuser[]>> => {
  // this is for pagination
  const { page = 1, limit = 10 } = paginationOption;
  const skip = (page - 1) * limit;
  const result = await User.find()
    .sort({
      createdAt: "desc",
    })
    .skip(skip)
    .limit(limit);
  const total = await User.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single user
const getSingleUser = async(id:string):Promise<Iuser |null>=>{
    const result = await User.findById(id);
    return result 
}
// update user 
const updateUser = async(id:string,payload:Partial<Iuser>)=>{
    const result = await User.findByIdAndUpdate(
        {_id:id},
        {$set:{...payload,email:undefined}},
        {new:true}
    );
    return result
}
// delete user
const deleteUser = async (id: string) => {
    const result = await User.findByIdAndDelete(id);
    return result;
  };
  
export const userService = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser
};

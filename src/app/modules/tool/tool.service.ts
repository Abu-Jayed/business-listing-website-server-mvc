import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { ITool } from "./tool.interface";
import { Tool } from "./tool.model";
import { IPaginationOption } from "../../../shared/pagination";
import { IGenericResponse } from "../../../interfaces/common";

const createTool = async(tool:ITool)=>{
    const result = await Tool.create(tool);
    if(!result){
        throw new ApiError(httpStatus.BAD_REQUEST, "user is already exist");

    }
    return result;
}


const getAllTool = async (
    paginationOption: IPaginationOption
  ): Promise<IGenericResponse<ITool[]>> => {
    // this is for pagination
    const { page = 1, limit = 10 } = paginationOption;
    const skip = (page - 1) * limit;
    const result = await Tool.find()
      .sort({
        createdAt: "desc",
      })
      .skip(skip)
      .limit(limit);
    const total = await Tool.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };
  const getSingleTool = async(id:string):Promise<ITool |null>=>{
    const result = await Tool.findById(id);
    return result 
}
const updateToolById = async(id:string,payload:Partial<ITool>)=>{
    const result = await Tool.findByIdAndUpdate(
        {_id:id},
        {$set:{...payload,email:undefined}},
        {new:true}
    );
    return result
}
const deleteById = async (id: string) => {
    const result = await Tool.findByIdAndDelete(id);
    return result;
  };
  
export const toolService = {
    createTool,
    getAllTool,
    getSingleTool,
    updateToolById,
    deleteById
}
import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import catchAsync from "../../../shared/catchAsync";
import { responseForData } from "../../../shared/sendRespons";
import { toolService } from "./tool.service";
import pick from "../../../shared/pick";
import { ITool } from "./tool.interface";
 
 

const createTool = catchAsync(async (req: Request, res: Response) => {
    const toolData = req.body;
    const result = await toolService.createTool(toolData);
 
    responseForData.sendResponseForCreate(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created Successful',
      data: result,
    });
  });

  // get all tools
  const getAllTool = catchAsync(async(req:Request,res:Response)=>{
    const paginationOption = pick(req.query,[
        'limit',
        'page',
        'sortBy',
        'sortOrder'
    ])
    const result = await toolService.getAllTool(paginationOption);
    responseForData.sendResponse<ITool[]>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Getting Successfull',
        data:result.data,
        meta:result.meta
    })
})
const getSingleTool = catchAsync(async(req:Request,res:Response)=>{
  const id = req.params.id;
  const result = await toolService.getSingleTool(id)
  responseForData.sendResponseForCreate<ITool>(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Getting succesfull',
      data:result
  })
  
})
const updateById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const travelData = req.body;
  const result = await toolService.updateToolById(id, travelData);
  responseForData.sendResponseForCreate<ITool>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User data Update Successful',
    data: result,
  });
});
const deleteById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await toolService.deleteById(id);
  responseForData.sendResponseForCreate(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Delete Successful',
    data: result,
  });
});

export const toolController ={
    createTool,
    getAllTool,
    getSingleTool,
    updateById,
    deleteById
}
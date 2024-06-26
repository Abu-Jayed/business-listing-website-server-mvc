import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { User } from "../user/user.model";
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import bcrypt from'bcryptjs';
import { jwtToken } from "../../../shared/jwtToken";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
const loginUser = async(payload:ILoginUser): Promise<ILoginUserResponse>=>{
    const {email,password} = payload
  // check user existance
  const isUserExist = await User.findOne({email},{email:1,password:1,role:1}).lean();
  if(!isUserExist){
    throw new ApiError(httpStatus.NOT_FOUND,"User doesn't exist")
  }
  // check mathched password
    if(!isUserExist){
      throw new ApiError(httpStatus.NOT_FOUND,"user doesn't exist")
    }
    // check password 
    const isPasswordMathc = await bcrypt.compare(password,isUserExist?.password)
    if(!isPasswordMathc){
      throw new ApiError(httpStatus.UNAUTHORIZED,'Password is not matched')
    }
    const {email:userEmail,role} = isUserExist
    // create a accetoken 
    const accessToken = jwtToken.createToken(
      { userEmail, role },
      config.jwt_secret as Secret,
      { expiresIn: config.jwt_expires_in as string },
    );
    const refreshToken = jwtToken.createToken(
      { userEmail, role },
      config.jwt_refresh_token as Secret,
      { expiresIn: config.jwt_refresh_expires_in as string },
    );
    return {
      accessToken,
      refreshToken,
    };
   
}
// refresh token

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verfiy token

  let verifyToken = null;
  try {
    verifyToken = await jwtToken.verifyToken(
      token,
      config.jwt_refresh_token as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }

  // checking deleted user refresh token

  const userEmail = verifyToken?.userEmail;

  //   check user existance

  const isUserExist = await User.findOne({ email: userEmail });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  // generate new token

  const newAccessToken = await jwtToken.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt_secret as Secret,
    { expiresIn: config.jwt_expires_in },
  );

  return {
    acceToken: newAccessToken,
  };
};
export const authService = {
  loginUser,refreshToken
}
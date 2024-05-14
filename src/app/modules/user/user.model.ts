import { Schema,model } from "mongoose";
import { Iuser, UserModel } from "./user.interface";
import bcrypt from'bcryptjs';
import config from "../../../config";

const userSchema = new Schema<Iuser>({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },

    
    image:{
        type:String
    },
    role:{
        type:String,
        enum:['addmin','buyer','seller']
    }

})
// has the password
// assalam 
 
  export const User = model<Iuser,UserModel>('User',userSchema)
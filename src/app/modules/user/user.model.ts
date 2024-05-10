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

    password:{
        type:String,
        required:true,
        select:0
    },
    phone:{
        type:String
    },
    role:{
        type:String,
        enum:['addmin','buyer','seller']
    },
    address:{
        type:String
    },

})
// has the password
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bycrypt_salt_round),
    );
    next();
  });
  export const User = model<Iuser,UserModel>('User',userSchema)
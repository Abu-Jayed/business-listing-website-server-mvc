import { Model }from'mongoose'
export type Iuser = {
    name:string;
    email:string;
    image:string;
};
export type UserModel = Model<Iuser,Record<string,unknown>>;
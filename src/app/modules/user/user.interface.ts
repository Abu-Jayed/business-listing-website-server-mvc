import { Model }from'mongoose'
export type Iuser = {
    name:string;
    email:string;
    image:string;
    address:string;
    role:'admin' | 'buyer' | 'seller'
    
};
export type UserModel = Model<Iuser,Record<string,unknown>>;
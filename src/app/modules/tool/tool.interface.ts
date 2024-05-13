import { Model, Schema } from 'mongoose';
import { Iuser } from '../user/user.interface';
export type ITool ={
    toolName:string;
    toolDescription:string;
    sorDescription:string;
    useCase1:string;
    useCase2:string;
    priceRate:string;
    toolUrl:string;
    parentCategory:string;
    category:string;
    paymentModel:string;
    submitedBy:string;
    saved:number;
    slug:string;
    savedByUsers: Array<Schema.Types.ObjectId> | Iuser;
    createdAt: {
        date: Date;
    
    };
    pending:boolean;
    published:boolean;
    featured:boolean;
    publishedAt?:{
        date:string
    }
}
export type toolModel = Model<ITool ,Record<string,unknown>>;
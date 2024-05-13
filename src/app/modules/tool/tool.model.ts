import { Model, Schema, model } from "mongoose";
import { ITool } from "./tool.interface";

const toolSchema = new Schema<ITool>(
    {
        toolName:{
            type:String
        },
        toolDescription:{
            type:String
        },
        sorDescription:{
            type:String
        },
        useCase1:{
            type:String
        },
        useCase2:{
            type:String
        },
        priceRate:{
            type:String
        },
        toolUrl:{
            type:String
        },
        parentCategory:{
            type:String
        },
        category:{
            type:String
        },
        paymentModel:{
            type:String
        },
        submitedBy:{
            type:String
        },
        saved:{
            type: Number
        },
        slug:{
            type:String
        },
      savedByUsers: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],

      createdAt: {
        $date: { type: Date, default: Date.now }
    },
    pending:{
        type:Boolean,default:false
    },
    published:{
        type:Boolean ,default:false
    },
    featured:{
        type:Boolean,default:false
    },
    publishedAt:{type:Date}
    }
)

export const Tool  = model<ITool>('Tool', toolSchema);

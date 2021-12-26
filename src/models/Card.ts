
import { Schema, model } from 'mongoose'

export interface ICardSchema {
    url:string;
    likes:number;
    name:string;
    image:string;
}

const cardSchema = new Schema<ICardSchema>({
    url:{
        type: String,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    likes: {
        type: Number,
        default: 1
    }
},{
    versionKey: false
});

cardSchema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


export default model<ICardSchema>('Card', cardSchema);
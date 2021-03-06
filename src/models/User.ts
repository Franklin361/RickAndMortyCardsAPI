
  
import { Schema, model } from 'mongoose'

export interface IUserSchema {
    username:string;
    password:string;
    email:string;
    favorites:string[];
}

const userSchema = new Schema<IUserSchema>({
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    favorites:{
      type: [String]  
    }
},{
    versionKey: false
});


userSchema.method("toJSON", function () {
    const { _id,password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});



export default model<IUserSchema>('User', userSchema);
import { Schema, model } from 'mongoose';

import { emailRegexp, typeList } from '../../constants/users.js';

const userSchema = new Schema(  {

    gender: { 
       type: String,
    enum: typeList,
    required: true,     
     default: 'woman',     
    },
    
    name: {      
        type: String,
    },
    
    email: {      type: String,
        match: emailRegexp,      
        unique: true,
        required: true,   
     },
    password: {     
         type: String,
          required: true,    
        },
        avatarUrl: {     
            type: String,
            default: null,   
           },
           daylyNorm: {     
            type: String, 
           },
      },  
    
    { versionKey: false, timestamps: true },
    );
    
    
    userSchema.methods.toJSON = function () {  const obj = this.toObject();
      delete obj.password;  return obj;
    };
    
    const UserCollection = model('user', userSchema);
    
    export default UserCollection;
import { Schema, model } from 'mongoose';

import { emailRegexp, typeList } from '../../constants/users.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: 'User',
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: typeList,
      default: 'woman',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    daylyNorm: {
      type: Number,
      default: 1800,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserCollection = model('user', userSchema);

export default UserCollection;

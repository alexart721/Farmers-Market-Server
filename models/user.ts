import { Model } from 'mongoose';
import mongoose from '../db';

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const User: Model<User> = mongoose.model('Usertable', userSchema);

export default User;

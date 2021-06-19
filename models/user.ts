import { Model, Schema, model } from 'mongoose';

export interface UserEntry {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSchema = new Schema<UserEntry>({
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

const User: Model<UserEntry> = model('User', userSchema);

export default User;

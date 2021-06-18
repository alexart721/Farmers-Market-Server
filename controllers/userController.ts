import { Request, Response } from 'express';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usertable, { UserEntry } from '../models/user';
import {
  badRequest,
  conflict,
  forbidden,
  notFound,
  printOperation,
  serverError,
} from './handlers';

const SECRET_KEY = process.env.SECRET_KEY || 'This is first trial authentication';

export const create = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (password === '') return badRequest(res, 'Password cannot be empty');
  try {
    const user = await Usertable.findOne({ email });
    if (user) return conflict(res, 'User already exists');
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Usertable.create({ ...req.body, password: hashPassword });
    const { _id } = newUser;
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).json({ _id, accessToken });
  } catch (error) {
    console.error(printOperation(req), `\n[Error]: ${error}`);
    return serverError(res);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await Usertable.findOne({ email });
    if (!user) return notFound(res);
    const validatedPassword = await bcrypt.compare(password, user.password);
    if (!validatedPassword) return forbidden(res, 'Incorrect login credentials');
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).json({ _id: user._id, accessToken });
  } catch (error) {
    console.error(printOperation(req), `\n[Error]: ${error}`);
    return serverError(res);
  }
};

export const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      _id,
      lastName,
      firstName,
      email,
    } = res.locals.user as Omit<UserEntry & Document<string>, 'password'>;
    if (!_id) return forbidden(res);
    res.status(200).json({
      _id,
      lastName,
      firstName,
      email,
    });
  } catch (error) {
    console.error(printOperation(req), `\n[Error]: ${error}`);
    return serverError(res);
  }
};

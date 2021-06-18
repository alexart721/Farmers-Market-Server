import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import { forbidden, printOperation, serverError } from '../handlers';

const SECRET_KEY = process.env.SECRET_KEY || 'Am I secure to send data';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const [token] = req.headers.authorization?.match(/\S+$/) || [];
  if (!token) return forbidden(res, 'Authorization token is missing');

  try {
    const { _id } = jwt.verify(token, SECRET_KEY) as { _id: string };
    const user = await User.findById(_id);
    if (!user) return forbidden(res);
    res.locals.user = user;
    next();
  } catch (error) {
    console.error(printOperation(req), `\n[Error]: ${error}`);
    return serverError(res);
  }
};

export default authMiddleware;

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';


const SECRET_KEY = process.env.SECRET_KEY || 'Am I secure to send data';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, SECRET_KEY) as { _id: string };
    const user = await User.findOne({ _id });
    if (!user) return res.sendStatus(401);
    res.locals.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;

import { Request, Response } from 'express';
import ProductTable from '../models/product';
import { printOperation, serverError } from './handlers';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductTable.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(printOperation(req), `\n[Error]: ${error}`);
    return serverError(res);
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductTable.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.error(printOperation(req), `\n[Error]: ${error}`);
    return serverError(res);
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const addProduct = await ProductTable.create(req.body);
    res.status(201).json(addProduct);
  } catch (error) {
    console.error(printOperation(req), `\n[Error]: ${error}`);
    return serverError(res);
  }
};

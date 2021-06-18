import { Request, Response } from 'express';
import ProductTable from '../models/product';
import CartTatble from '../models/cart';
import { notFound, printOperation, serverError } from './handlers';

export const getMyProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const myProducts = await ProductTable.find({ email: req.params.email });
    res.status(200).json(myProducts);
  } catch (error) {
    console.error(printOperation(req), `\n[Error]: ${error}`);
    return serverError(res);
  }
};

export const removeMyListing = async (req: Request, res: Response): Promise<void> => {
  try {
    const removeListing = await ProductTable.findOneAndDelete({ _id: req.params.id });
    const removeListingFromCart = await CartTatble.findOneAndDelete({ _id: req.params.id });
    if (!removeListing || !removeListingFromCart) return notFound(res);
    res.status(203).json({ message: 'OK' });
  } catch (error) {
    console.error(printOperation(req), `\n[Error]: ${error}`);
    return serverError(res);
  }
};

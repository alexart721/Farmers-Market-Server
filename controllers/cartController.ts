import { Request, Response } from 'express';
import Cart from '../models/cart';
import Product from '../models/product';
import {
  conflict,
  notFound,
  printOperation,
  serverError,
} from './handlers';

export const addProductToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const productInCart = await Cart.findById(req.params.id);
    if (!productInCart) {
      const product = await Product.findById(req.params.id);
      const userEmail = req.params.email;
      const newProduct = { ...product?.toObject(), userEmail };
      const addProductCart = await Cart.create(newProduct);
      res.status(201).json(addProductCart);
    } else {
      return conflict(res, 'Product is already added to cart');
    }
  } catch (error) {
    console.error(printOperation(req), `\n[Error]: ${error}`);
    return serverError(res);
  }
};

export const getCartProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const allCartProducts = await Cart.find({ userEmail: req.params.email });
    res.status(200).json(allCartProducts);
  } catch (error) {
    console.error(printOperation(req), `\n[Error]: ${error}`);
    return serverError(res);
  }
};

export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const removeProduct = await Cart.findOneAndDelete({ _id: req.params.id });
    if (!removeProduct) return notFound(res);
    res.status(203).json({ message: 'OK' });
  } catch (error) {
    console.error(printOperation(req), `\n[Error]: ${error}`);
    return serverError(res);
  }
};

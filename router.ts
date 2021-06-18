import { Router } from 'express';

import { createProduct, getProductById, getProducts } from './controllers/productController';
import authMiddleware from './controllers/middleware/auth';
import { getMyProducts, removeMyListing } from './controllers/myListingController';
import { addProductToCart, getCartProducts, removeFromCart } from './controllers/cartController';
import { create, login, profile } from './controllers/userController';

const router = Router();

router.post('/register', create);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
// TODO: router.post('/logout', authMiddleware, logout);

router.get('/products', authMiddleware, getProducts);
router.get('/products/:id', authMiddleware, getProductById);
router.get('/products/myList/:email', authMiddleware, getMyProducts);
router.post('/seller', authMiddleware, createProduct);
router.post('/cart/:id/:email', authMiddleware, addProductToCart);
router.get('/cart/:email', authMiddleware, getCartProducts);
router.delete('/cart/:id', authMiddleware, removeFromCart);
router.delete('/myList/:id', authMiddleware, removeMyListing);

export default router;

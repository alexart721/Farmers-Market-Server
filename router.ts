import { Router } from 'express';

import productController from './controllers/productController';
import userController from './controllers/userController';
import cartController from './controllers/cartController';
import myListingController from './controllers/myListingController';
import authMiddleware from './middleware/auth';

const router = Router;

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);

router.get('/products', authMiddleware, productController.getProducts);
router.get('/products/:id', authMiddleware, productController.getProductById);
router.get('/products/myList/:email', authMiddleware, myListingController.getMyProducts);
router.post('/seller', authMiddleware, productController.createProduct);
router.post('/cart/:id/:email', authMiddleware, cartController.addProductToCart);
router.get('/cart/:email', authMiddleware, cartController.getCartProducts);
router.delete('/cart/:id', authMiddleware, cartController.removeFromCart);
router.delete('/myList/:id', authMiddleware, myListingController.removeMyListing);

export default router;

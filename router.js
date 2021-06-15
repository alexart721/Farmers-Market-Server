const router = require('express').Router();
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const authMiddleware = require('./middleware/auth');

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);

router.get('/products', authMiddleware, productController.getProducts);
router.get('/products/:id', authMiddleware, productController.getProductById);
router.post('/seller', authMiddleware, productController.createProduct);

module.exports = router;
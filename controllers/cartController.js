const CartTatble = require('../models/cart');
const ProductTable = require('../models/product');

exports.addProductToCart = async (req,res) => {
    try {
        const product = await ProductTable.findById(req.params['id']);
        const productInCart = await CartTatble.findById(req.params['id']);
        if (!productInCart) {
            const userEmail = req.params['email']
            const newProduct = { ...product['_doc'], userEmail:userEmail };
            const addProductCart = await CartTatble.create(newProduct);
            res.status(201).send(addProductCart);
        } else {
            return res.status(409).send({ error:'409', message: 'Product is already added to cart' })
        }
    } catch (error) {
        res.status(404).send({ error });
    }
};

exports.getCartProducts = async (req, res) => {
    try {
        const allCartProducts = await CartTatble.find({userEmail:req.params['email']});
        res.status(200).send(allCartProducts);
    } catch (error) {
        res.status(404).send({ error });
    }
};

exports.removeFromCart = async (req,res) => {
    try {
        const removeProduct = await CartTatble.findOneAndDelete(req.params['id']);
        if (!removeProduct) return res.sendStatus(404);
        return res.sendStatus(203)
    } catch (error) {
        res.status(404).send({ error });
    }
};
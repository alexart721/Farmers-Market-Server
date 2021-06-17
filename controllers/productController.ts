const ProductTable = require('../models/product');

exports.getProducts = async (req, res) => {
  try {
    const products = await ProductTable.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send({ error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await ProductTable.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send({ error });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const addProduct = await ProductTable.create(req.body);
    res.status(201).send(addProduct);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create product' });
  }
};

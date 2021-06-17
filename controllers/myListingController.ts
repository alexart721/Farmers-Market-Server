const ProductTable = require('../models/product');
const CartTatble = require('../models/cart');

exports.getMyProducts = async (req, res) => {
  try {
    const myProducts = await ProductTable.find({ email: req.params.email });
    res.status(200).send(myProducts);
  } catch (error) {
    res.status(404).send({ error });
  }
};

exports.removeMyListing = async (req, res) => {
  try {
    const removeListing = await ProductTable.findOneAndDelete({ _id: req.params.id });
    const removeListingFromCart = await CartTatble.findOneAndDelete({ _id: req.params.id });
    if (!removeListing || !removeListingFromCart) return res.sendStatus(404);
    return res.sendStatus(203);
  } catch (error) {
    res.status(404).send({ error });
  }
};

import { Schema, Model, model } from 'mongoose';

export interface ProductEntry {
  firstName: string;
  lastName: string;
  email: string;
  productName: string;
  productDescription: string;
  price: number;
  quantity: number;
  imageUrl: string;
  city: string;
  province: string;
}

const productSchema = new Schema<ProductEntry>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

const Product: Model<ProductEntry> = model('Product', productSchema);

export default Product;

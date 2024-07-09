import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    productPrice: {
      type: String,
      required: true,
    },
    productDiscount: {
      type: String,
      required: true,
    },
    productImages: [
      {
        type: String,
        required: true,
      },
    ],
    productColors: [
      {
        type: String,
        required: true,
      },
    ],
    productSizes: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Products = mongoose.model("products", productSchema);

export default Products;

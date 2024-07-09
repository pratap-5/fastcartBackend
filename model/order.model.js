import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  accountNo: {
    type: String,
    required: true,
  },

  amount: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("orders", orderSchema);

export default Order;

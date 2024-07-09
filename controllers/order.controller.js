import Order from "../model/order.model.js";

export const makeOrder = async (req, res) => {
  const userId = req.user._id;
  const { accountNo, productId,  amount } = req.body;

  if (!userId || !productId || !accountNo || !amount )
    return res.status(400).json({ error: "something went wrong" });
  const newOrder = new Order({
    userId,
    productId,
    accountNo,
    amount,
 
  });

  if (newOrder) {
    await newOrder.save();
    res.status(200).json({ msg: "successfully ordered" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).populate("productId");

    res.status(200).json({ orders });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

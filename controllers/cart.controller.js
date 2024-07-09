
import Cart from "../model/cart.model.js";


export const addCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

 

    if (!productId) return res.status(404).json({ error: "invalid product" });

    const isAdded = await Cart.findOne({userId, productId });

    
    if (isAdded) {
      return res.status(400).json({ error: "product is already added " });
    }

    const newCart = new Cart({
      userId,
      productId,
    });

    if (newCart) {
      await newCart.save();
      res.status(200).json({
        userId: newCart.userId,
        productId: newCart.productId,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error " });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartProducts = await Cart.find({ userId }).populate("productId");
    res.status(200).json({ cartProducts });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

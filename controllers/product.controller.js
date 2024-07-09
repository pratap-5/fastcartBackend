import Products from "../model/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const {
      companyName,
      productType,
      productName,
      productPrice,
      productDiscount,
      productImages,
      productColors,
      productSizes,
    } = req.body;

    const isProduct = await Products.findOne({ productName });
    if (isProduct) {
      return res.status(400).json({ error: "product is already exist" });
    }

    const newProduct = new Products({
      companyName,
      productType,
      productName,
      productPrice,
      productDiscount,
      productImages,
      productColors,
      productSizes,
    });

    if (newProduct) {
      await newProduct.save();
      res.send("product is stored");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error " });
  }
};

export const getProduct = async (req, res) => {
  try {
    const products = await Products.find({});

    res.status(200).json({ products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error " });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Products.findById(productId);

    res.status(200).json({ product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error " });
  }
};

export const getSearchList = async (req, res) => {
  try {
    const { searchItem } = req.params;

    const products = await Products.find({});

    const searchList = products.filter((product) => {
     
      return (
        product.productType
          .trim()
          .toLowerCase()
          .includes(searchItem.toLowerCase().trim()) ||
        product.productName
          .trim()
          .toLowerCase()
          .includes(searchItem.toLowerCase().trim())
      );
    });

    res.status(200).json({ searchList });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error " });
  }
};

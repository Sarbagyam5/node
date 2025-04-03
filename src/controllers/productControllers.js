import productServices from "../services/productServices.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await productServices.getAllProducts(req.query);
    res.json(products);
  } catch (error) {
    res.json(error.message)
  }
}
const createProduct = async (req, res) => {
  const userId = req.user.id;
  const images = req.files;
  const data = req.body;

  if (!data.name) return res.status(400).send("Product name is required")
  if (!data.brand) return res.status(400).send("Product brand is required")
  if (!data.category) return res.status(400).send("Product categroy is required")
  if (!data.price) return res.status(400).send("Product price is required")


  try {
    const products = await productServices.createProduct(userId, data, images);
    res.json(products);
  } catch (error) {
    res.json(error.message)
  }
}

const getProductById = async (req, res) => {
  const id = req.params.id

  try {
    const product = await productServices.getProductById(id);
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const deleteProduct = async (req, res) => {
  const id = req.params.id
  const user = req.user
  try {
    await productServices.deleteProduct(id, user);
    res.json(`Product Id:${id} deleted succecfully`)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const updateProduct = async (req, res) => {
  const id = req.params.id
  const user = req.user
  const images = req.files;

  try {
    const product = await productServices.updateProductById(id, user, req.body, images);
    res.json(product)
  } catch (error) {
    res.status(500).send(error.message)
  }
}


export {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct
}
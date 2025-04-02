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
  try {
    const products = await productServices.createProduct(userId, req.body, images);
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
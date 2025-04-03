import { ROLE_ADMIN } from "../constants/roles.js";
import Product from "../models/Product.js";
import uploadFile from "../utils/file.js";

const getAllProducts = async (query) => {
  const sort = JSON.parse(query.sort || "{}");
  const limit = query.limit;
  const offset = query.offset;
  const filter = {};

  const { name, brands, category, max, min } = query

  if (name) {
    filter.name = { $regex: name, $options: "i" }
  }

  if (brands) {
    const brandItems = brands.split(",")
    filter.brand = { $in: brandItems };
  }

  if (category) {
    filter.category = { $regex: category, $options: "i" }
  }

  if (max) {
    filter.price = { $lte: max }
  }
  if (min) {
    filter.price = { ...filter.price, $gte: min }
  }

  const products = await Product.find(filter)
    .sort(sort)
    .limit(limit)
    .skip(offset)

  return products;
};



const createProduct = async (userId, data, images) => {
  console.log(images)
  try {
    const uploadImages = await uploadFile(images)
    return await Product.create({
      ...data,
      createdBy: userId,
      imageUrls: uploadImages?.map((images) => images?.url)
    });
  } catch (error) {
    throw new Error(error.message)
  }

};



const deleteProduct = async (id, user) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found")
  console.log(user.id)
  console.log(product)

  if (user.id == product.createdBy || user.role.includes(ROLE_ADMIN)) return await Product.findByIdAndDelete(id)
  throw new Error("Access Denied")
};



const getProductById = async (data) => {
  return await Product.findById(data);
};



const updateProductById = async (id, user, data, images) => {
  const product = await Product.findById(id);
  const uploadImages = await uploadfile([images])


  if (!product) throw new Error({
    status: 404,
    message: "Product not found"
  })

  if (user.id == product.createdBy || user.role.includes(ROLE_ADMIN))
    return await Product.findByIdAndUpdate({ ...data, imageUrls: uploadImages.map(img => img.url) }, { new: true });
  throw new Error("Access Denied")

};


export default {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProductById,
};

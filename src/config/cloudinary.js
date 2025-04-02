import { v2 as cloudinary } from 'cloudinary';

function connectCloudinary() {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  } catch (error) {
    throw new Error("Cant connect to cloudinary")
  }
}
export default connectCloudinary;
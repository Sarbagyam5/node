import express from "express"
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

import connectDB from "./config/database.js";
import connectCloudinary from "./config/cloudinary.js"
import multer from "multer"


dotenv.config()

const app = express();

const upload = multer({
  storage: multer.memoryStorage()
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
connectCloudinary();

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.json({
    status: "ok",
    version: "1.0.0",
    port: port,
    author: "Sarbagya Ghimire"
  })
});


app.use('/api/auth/', authRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/payment', paymentRoutes)

app.use('/api/users', upload.single("image"), userRoutes);
app.use('/api/products', upload.array("image", 5), productRoutes);


app.listen(port, () => {
  console.log(`Connected to port ${port}.....`)
})


const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const cartRoute = require("./routes/cart")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const app = express();
const PORT  = process.env.PORT || 5000

dotenv.config();

const limiter = rateLimit({
  windowMs : 1000,
  max: 5
})

mongoose.connect(
  process.env.MONGO_URL
).then(()=> console.log("Db connected"))
.catch((err) => {
  console.log(err);
});

app.use(limiter);
app.use(cors());
app.use(express.json())
app.use("/api/auth" , authRoute);
app.use("/api/users" , userRoute);
app.use("/api/products" , productRoute);
app.use("/api/carts" , cartRoute);
app.use("/api/orders" , orderRoute);
app.use("/api/checkout" , stripeRoute);



app.listen( PORT , () => {
  console.log("Backend Server Is Running!")
})
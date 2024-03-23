const express = require("express");
const app = express();
require("dotenv/config");
const morgan = require("morgan");
const mongoose = require("mongoose");
const productRouter = require("./routers/product");
const categoryRouter = require("./routers/category");
const UserRouter = require("./routers/User");
const OrdersRouter = require("./routers/orders");

const cors = require("cors");
const { ErrorHandeler, RequestHandeller } = require("./helpers/ErrorHandeler");

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(ErrorHandeler);

// Routers
app.use(`/api/category`, categoryRouter);
app.use(`/api/products`, productRouter);
app.use(`/api/users`, UserRouter);
app.use("/api/orders", OrdersRouter);

app.use(RequestHandeller);
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database is connected now");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(4001, () => {
  console.log("Server is running on port 4001");
});

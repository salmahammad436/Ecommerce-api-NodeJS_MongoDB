const express = require("express");
const router = express.Router();
const OrdersModel = require("../models/Orders");
const OrderItemModel = require("../models/OrderItem");
const { authorize, restrictTo } = require("../helpers/jwt");
const {
  GetAllOrders,
  GetOrderById,
  CreateOrder,
  UpdateOrder,
  DeletOrder,
} = require("../controller/orders");

router.get("/", authorize, restrictTo("Seller"), GetAllOrders);

router.get("/:id", authorize,restrictTo('User','Seller') ,GetOrderById);

router.post("/", authorize, restrictTo("User"), CreateOrder);

router.patch("/:id",authorize,restrictTo('Seller'), UpdateOrder);

router.delete("/:id",authorize,restrictTo('Seller'), DeletOrder);

module.exports = router;

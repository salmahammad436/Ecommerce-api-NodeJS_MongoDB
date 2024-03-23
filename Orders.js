const mongoose = require("mongoose");
const OrderItemModel = require("../models/OrderItem");
const UserModel = require("../models/users");

const OrdersSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ShipingAddress: {
    type: String,
  },
  phone: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  TotalPrice: {
    type: Number,
  },
  DateOrder: {
    type: Date,
    default: Date.now,
  },
});

const OrdersModel = mongoose.model("Orders", OrdersSchema);

module.exports = OrdersModel;

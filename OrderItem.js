const mongoose = require("mongoose");
const { ProductModel } = require("../models/products");
const { CategoryModel } = require("../models/Category");

const OrderItemSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
 productId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderItemModel = mongoose.model("OrderItem", OrderItemSchema);

module.exports = OrderItemModel;

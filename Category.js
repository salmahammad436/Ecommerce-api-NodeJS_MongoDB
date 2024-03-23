const mongoose = require("mongoose");
const UserModel=require('../models/users');
const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// CategorySchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// CategorySchema.set("toJSON", {
//   virtuals: true,
// });

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = {CategoryModel};

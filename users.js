
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv/config");
const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  street: {
    type: String,
    default: "",
  },
  apartment: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "User",
    enum: ["User", "Seller"],
  },
});

// UserSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// UserSchema.set("toJSON", {
//   virtuals: true,
// });

UserSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(10);
  let hashedpassword = await bcrypt.hash(this.password, salt);
  this.password = hashedpassword;
  next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = {UserModel};
 


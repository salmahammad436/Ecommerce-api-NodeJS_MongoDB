const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserModel = require("../models/users");
const bcrypt = require("bcrypt");
const { authorize, restrictTo } = require("../helpers/jwt");
const { token } = require("morgan");
require("dotenv/config");

const {
  GetAllUsers,
  GetById,
  GetUserCount,
  LogIn,
  Register,
  CreateUser,
} = require("../controller/users");

router.post("/", CreateUser);

router.get("/", authorize, restrictTo("Seller"), GetAllUsers);

router.get("/:id", authorize, restrictTo("Seller", "User"), GetById);

router.post("/login", LogIn);

router.post("/register", Register);

router.get("/get/count", authorize, restrictTo("Seller"), GetUserCount);

module.exports = router;

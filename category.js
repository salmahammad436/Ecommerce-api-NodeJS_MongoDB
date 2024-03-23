const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CategoryModel = require("../models/Category");
const autho = require("../helpers/jwt");
const { authorize, restrictTo } = require("../helpers/jwt");

const {
  getAllCategory,
  CreateNewCategory,
  GetById,
  DeleteCategory,
  UpdateById,
} = require("../controller/category");

//const authJWT=require('../helpers/jwt')

router.get("/", getAllCategory);

router.post("/", authorize, restrictTo("Seller"), CreateNewCategory);

router.delete("/:id", authorize, restrictTo("Seller"), UpdateById);

router.get("/:id", authorize, restrictTo("Seller", "User"), GetById);

router.patch("/:id", authorize, restrictTo("Seller"), UpdateById);

module.exports = router;

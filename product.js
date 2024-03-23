const express = require("express");
const router = express.Router();
const multer = require("multer");
const { authorize, restrictTo } = require("../helpers/jwt");
const {
  GetAllProducts,
  GetProductById,
  CreatProduct,
  GetProductsCount,
  GetFeaturedProducts,
  UpdateProduct,
  DeletProductById,
  saerchByName,
} = require("../controller/product");

router.get("/", GetAllProducts);

router.get("/:id", authorize, restrictTo("Seller"), GetProductById);

router.patch("/:id", authorize, restrictTo("Seller"), UpdateProduct);

router.delete(
  "/:id",
  authorize,
  restrictTo("Seller"),
  DeletProductById
);

router.get("/get/count", authorize, restrictTo("Seller"), GetProductsCount);

router.get(
  "/get/featured/:count",
  authorize,
  restrictTo("Seller"),
  GetFeaturedProducts
);
router.get("/search/:name", authorize, saerchByName);

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isvalid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid Image type");
    if (isvalid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split("").join("-");
    const extention = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}- ${Date.now()}.${extention}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.post(
  "/",
  uploadOptions.single("image"),
  authorize,
  restrictTo("Seller"),
  CreatProduct
);

// const UploadImages = async (req, res) => {
//   if (!mongoose.ProductModel.isValidObjectId(req.params.id)) {
//     res.status(400).send("Invalid Id Product");
//   }
// };

// router.put("/gallary/:id",uploadOptions.array('images',12),authorize,restrictTo('Seller'),UploadImages)

module.exports = router;

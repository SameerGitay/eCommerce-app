import express from "express";
import formidableMiddleware from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  updateProductController,
  productController,
  singleProductController,
  productPhotoController,
  deleteProductController
} from "../controllers/productController.js";
import { validateCreateProduct } from "../helpers/validator.js";

const productRoutes = express.Router();

productRoutes.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidableMiddleware(),
  // validateCreateProduct(),
  createProductController
);

productRoutes.post("/photo", productPhotoController)

// productRoutes.delete("/:pid", deleteProductController);

productRoutes.delete("/",
  requireSignIn,
  isAdmin,
  deleteProductController);

productRoutes.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidableMiddleware(),
  updateProductController
);

productRoutes.post(
  "/",
  productController)

productRoutes.post(
  "/:slug",
  singleProductController)



export default productRoutes;

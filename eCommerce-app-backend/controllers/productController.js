import colors from "colors";
import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

import path from 'path';
import { fileURLToPath } from 'url';

import { validationResult } from "express-validator";

// export const createProductController = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     const __filename = fileURLToPath(import.meta.url);
//     const __dirname = path.dirname(__filename);

//     console.log("dir ", __dirname)
//     console.log("file ", __filename)

//     if (!errors.isEmpty()) {
//       console.log(errors.array());
//       res.status(400).json({ success: false, msg: "Error creating product" });
//     } else {
//       const { name, description, price, category, quantity, shipping } =
//         req.fields;
//       const { photo } = req.files;

//       // validation

//       const product = new productModel({ ...req.fields, slug: slugify(name) });
//       if (photo) {
//         // product.photo.data = fs.readFileSync(photo.path);
//         // product.photo.contentType = photo.type;
//         let rawData = fs.readFileSync(photo.path)
//         fs.writeFileSync(__dirname + '../products/' + slugify(name))
//       }

//       // product = await product.save();
//       res.json({ success: true, data: product });
//     }
//   } catch (error) {
//     console.log(`Error adding product. Error ${error}`.bgRed.white);
//     res.status(500).json({ success: false, msg: "Something went wrong" });
//   }
// };


export const createProductController = async (req, res) => {
  try {

    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation to be shifted to express-validator
    switch (true) {
      case !name:
        return res.status(500).json({ success: false, msg: "Name is Required" });
      case !description:
        return res.status(500).json({ success: false, msg: "Description is Required" });
      case !price:
        return res.status(500).json({ success: false, msg: "Price is Required" });
      case !category:
        return res.status(500).json({ success: false, msg: "Category is Required" });
      case !quantity:
        return res.status(500).json({ success: false, msg: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .json({ success: false, msg: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Error in crearing product",
    });
  }
};


export const productController = async (req, res) => {
  try {

    let pageSize = req.body?.count || 10

    console.log(pageSize)
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(pageSize)
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: {
        count: products.length,
        products
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Erorr in getting products"
    });
  }
};

export const singleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Eror while getitng single product",
    });
  }
};


export const productPhotoController = async (req, res) => {
  try {
    console.log("*********")
    const product = await productModel.findById(req.body.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Erorr while getting photo"
    });
  }
};



//delete controller
export const deleteProductController = async (req, res) => {
  try {
    // await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    await productModel.findByIdAndDelete(req.body.pid).select("-photo");
    res.json({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Error while deleting product"
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};
const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");

// POST: create new product => /api/v1/admin/product/new
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// GET: get all products => /api/v1/products
exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

// GET:ID Get single product details => /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

// PUT: update product => /api/v1/admin/product/id
exports.updateProduct = async (req, res, next) => {
  const id = await Product.findById(req.params.id);
  const productDetailsToUpdate = await req.body;

  if (!id) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const product = await Product.findByIdAndUpdate(id, productDetailsToUpdate, {
    new: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

// DELETE: delete product => /api/v1/admin/product/:id

exports.deleteProduct = async (req, res, next) => {
  const id = await Product.findById(req.params.id);

  if (!id) {
    res.status(404).json({
      success: false,
      message: "Product not found....",
    });
  }

  const product = await Product.findByIdAndDelete(id);
  //   await id.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product is deleted",
    product,
  });
};

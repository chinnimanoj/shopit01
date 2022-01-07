const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const APIFeatures = require("../utils/apiFeatures");

// POST: create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// GET: get all products => /api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    // productCount,
    products,
  });
});

// GET:ID Get single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// PUT: update product => /api/v1/admin/product/id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const id = await Product.findById(req.params.id);
  const productDetailsToUpdate = await req.body;

  if (!id) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const product = await Product.findByIdAndUpdate(id, productDetailsToUpdate, {
    new: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// DELETE: delete product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const id = await Product.findById(req.params.id);

  if (!id) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const product = await Product.findByIdAndDelete(id);
  //   await id.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product is deleted",
    product,
  });
});

const express = require("express");
const app = express();

const errorMiddleware = require("./middlewares/errors");

app.use(express.json());

// import all the routes
const products = require("./routes/product");

app.use("/api/v1", products);

// middleware to handle errors. this has to be at the end of all the routes
app.use(errorMiddleware);

module.exports = app;

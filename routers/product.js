const express = require("express");
const { Router } = express;
const Product = require("../models").product;
const Category = require("../models").category;

const router = new Router();

// GET - /products: Returns a list of products with their categories
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll(req.body);
    res.send(products);
  } catch (e) {
    console.log(e.message);
  }
});

// GET - /products/:id Returns a specific product with it's category
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const product = await Product.findByPk(id, { include: [Category] });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send("Product not found!");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

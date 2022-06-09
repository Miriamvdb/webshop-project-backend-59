const express = require("express");
const { Router } = express;
const Product = require("../models").product;
const Category = require("../models").category;

const router = new Router();

// GET - /categories: Returns a list of categories with their categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll(req.body);
    res.send(categories);
  } catch (e) {
    console.log(e.message);
  }
});

// GET - /categories/:id Returns a specific categorie with it's id
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const category = await Category.findByPk(id);
    if (category) {
      res.send(category);
    } else {
      res.status(404).send("Category not found!");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

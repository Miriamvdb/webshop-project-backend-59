const express = require("express");
const { Router } = express;
const User = require("../models").user;
const bcrypt = require("bcrypt");
const { toData, toJWT } = require("../auth/jwt");

const authMiddleware = require("../auth/authMiddleware");
const router = new Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      res
        .status(401)
        .send("Please enter a valid name, unique email and character password");
    }
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    if (newUser) {
      res.send(newUser);
    } else {
      res.status(500).send("Something went wrong");
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({
      message: "Please supply a valid email and password",
    });
  } else {
    // 1. find user based on email address
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400).send({
        message: "User with that email does not exist",
      });
    }
    // 2. use bcrypt.compareSync to check the password against the stored hash
    else if (bcrypt.compareSync(password, user.password)) {
      // 3. if the password is correct, return a JWT with the userId of the user (user.id)
      const jwt = toJWT({ userId: user.id });
      res.send({
        jwt,
      });
    } else {
      res.status(400).send({
        message: "Password was incorrect",
      });
    }
    // res.send({
    //   jwt: toJWT({ userId: user.id }),
    // });
  }
});

module.exports = router;

router.get("/test-auth", authMiddleware, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  });
});

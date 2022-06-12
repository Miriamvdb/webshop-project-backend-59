const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

// 1. find user based on email address

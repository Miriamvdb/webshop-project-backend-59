const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const productRouter = require("./routers/product");
const userRouter = require("./routers/user");
const app = express();
const PORT = 4000;

const jsonParser = express.json();
app.use(jsonParser);
app.use(cors());

app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

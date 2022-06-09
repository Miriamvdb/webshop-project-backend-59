const express = require("express");
const cors = require("cors");

const productRouter = require("./routers/product");
const categoryRouter = require("./routers/category");

const app = express();
const PORT = 4000;

const jsonParser = express.json();
app.use(jsonParser);
app.use(cors());

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

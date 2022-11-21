const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const todoRoute = require("./routes/todoRoute");

const noPathMW = require("./middlewares/noPath");
const errorMW = require("./middlewares/error");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/todos", todoRoute);

app.use(noPathMW);
app.use(errorMW);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log("Server is running on PORT: " + PORT));

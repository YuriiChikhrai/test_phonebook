process.env.NODE_ENV = ["dev", "test", "production"].includes(
  process.env.NODE_ENV
)
  ? process.env.NODE_ENV
  : "dev";

const express = require("express");
const { join } = require("path");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const router = require("./router");
const config = require("./config/index");

const app = express();

nunjucks.configure(join(__dirname, "templates"), {
  autoescape: true,
  express: app,
  watch: true,
});

mongoose.connect(config.mongodb.uri, config.mongodb.options);
mongoose.set("debug", process.env.NODE_ENV !== "production");
mongoose.connection.on("error", (e) => {
  console.error("MongoDB error:", e);
  process.exit(1);
});

app.use("/", router);

module.exports = app;

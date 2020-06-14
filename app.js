const express = require("express");
const { join } = require("path");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const router = require("./router");

const app = express();

nunjucks.configure(join(__dirname, "templates"), {
  autoescape: true,
  express: app,
  watch: true,
});

mongoose.connect("mongodb://localhost:27017/contactbook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.set("debug", true);
mongoose.connection.on("error", (e) => {
  console.error("MongoDB error:", e);
  process.exit(1);
});

app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server start ${PORT}`);
});

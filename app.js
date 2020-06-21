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

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  if (typeof process.send === "function") {
    process.send("ready");
  }
  console.log(`Server start ${PORT}, env: ${process.env.NODE_ENV}`);
});

process.on("SIGINT", function () {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    mongoose.connection.close((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log("Gracefull shudown complete");
      process.exit(0);
    });
  });
});

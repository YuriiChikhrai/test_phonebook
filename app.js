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

const server = app.listen(PORT, () => {
  if (typeof process.send === "function") {
    process.send("ready");
  }
  console.log(`Server start ${PORT}`);
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

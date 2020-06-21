const app = require("./app");
const mongoose = require("mongoose");

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

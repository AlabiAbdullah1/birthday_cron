const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.URI;

function connetToDB() {
  mongoose.connect(URI);

  mongoose.connection.on("connected", () => {
    console.log("DB connected Successfully!");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });
}

module.exports = connetToDB;

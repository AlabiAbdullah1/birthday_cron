const mongoose = require("mongoose");
require("dotenv").config;

const dbURI = process.env.dbURI;

function connetToDB2() {
  mongoose.connect(dbURI);

  mongoose.connection.on("connected", () => {
    console.log("DB connected Successfully!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occured while trying to connect to DB", err.message);
  });
}

module.exports = connetToDB2;

const express = require("express");
const connetToDB = require("./db/dbConnection");
const registerRoute = require("./routes/register");
const bodyParser = require("body-parser");
const User = require("./db/register");
const sendEmail = require("./mail");
const schedule = require("node-schedule");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connetToDB();

schedule.scheduleJob(" 59 0 7 * * * ", async () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  const users = await User.find({});

  users.forEach((user) => {
    const userDOB = new Date(user.DOB);
    if (userDOB.getDate() === day && userDOB.getMonth() === month) {
      console.log(`Happy Birthday ${user.fullName} @ ${user.email}`);
      sendEmail(user.email, user.fullName);
    }
  });
});

app.use("/register", registerRoute);

const PORT = process.env.PORT;

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();

const todayDate = `${year}-${day}-${month}`;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...  ${todayDate}`);
});

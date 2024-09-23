const express = require("express");
const connectToDB = require("./db/dbConnection");
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

connectToDB();

// Schedule job to run at 7:00 AM every day
schedule.scheduleJob("0 7 * * *", async () => {
  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // getMonth() returns 0-11, so add 1 for human-readable months

    // Fetch all registered users from the database
    const users = await User.find({});

    users.forEach((user) => {
      const userDOB = new Date(user.DOB);
      if (userDOB.getDate() === day && userDOB.getMonth() + 1 === month) {
        // If today is the user's birthday, send an email
        sendEmail(user.email, user.fullName);
        console.log(
          `Sent Happy Birthday email to ${user.fullName} at ${user.email}`
        );
      }
    });
  } catch (err) {
    console.error("Error in scheduled job:", err);
  }
});

app.use("/register", registerRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Corrected month for logging
  const year = today.getFullYear();
  console.log(
    `Server running on port ${PORT}... Today's date: ${year}-${month}-${day}`
  );
});

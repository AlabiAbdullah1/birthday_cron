const User = require("../db/register");

exports.getRegister = async (req, res) => {
  try {
    res.status(200).render("index");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { fullName, email, DOB } = req.body;

    // const fullName = req.body.fullName;
    const user = await User.create({ fullName, email, DOB });
    // const user = await User.create(fullName);
    if (!user) {
      return res.status(400).json({
        message: "ERROR",
      });
    }

    res.status(201).json({
      message: " User created Successfully!",
      welcome: `Welcome to this platform ${fullName}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.welcome = async (req, res) => {
  res.render("Welcome");
};

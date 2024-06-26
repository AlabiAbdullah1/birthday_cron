const { Router } = require("express");
const registerController = require("../controller/register");
const validator = require("../middleware/validation.middleware");
const { registerValidation } = require("../validations/register.validation");

const registerRoute = Router();

registerRoute.get("/", registerController.getRegister);

registerRoute.post(
  "/",
  validator.validateSchema(registerValidation),
  registerController.register
);

registerRoute.get("/welcome", registerController.welcome);

module.exports = registerRoute;

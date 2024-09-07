const { body, query, params } = require("express-validator");
const { passwordChecker } = require("../utils")

/**@list_of_attributes for validation */
const first_name = body("first_name").isString().withMessage("Firs Name is required.");
const last_name = body("last_name").isString().withMessage("Last Name is required.");

const email = body("email")
    .isEmail()
    .withMessage("Please enter a valid email.");
const password = body("password").custom(passwordChecker)

/**@signup validation */
const SignUpValidations = [first_name, last_name, email, password];

/**@login_user validation */
const LoginValidations = [email, password];

module.exports = {
    SignUpValidations,
    LoginValidations,
};
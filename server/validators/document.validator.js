const { body, query, params } = require("express-validator");

/**@list_of_attributes for validation */
const title = body("title").isString().notEmpty().withMessage("Title  is required.");

/**@document validation */
const DocumentValidator = [title];

module.exports = {
    DocumentValidator,
};
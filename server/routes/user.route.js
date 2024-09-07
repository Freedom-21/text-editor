const express = require("express");
const router = express.Router()

const { validatorMiddleware } = require("../middleware/validatorMiddleware")
const { LoginValidations, SignUpValidations } = require("../validators/user.validator")


const { protect } = require("../middleware/authMiddleware")
const { signUp, login, getUser, updateUser, deleteUser, getLoggedUser } = require("../controllers");


router.route("/signup").post(SignUpValidations, validatorMiddleware, signUp)
router.route("/login").post(LoginValidations, validatorMiddleware, login)
router.route("/").get(protect, getUser)
router.route("/logged_user").get(protect, getLoggedUser)
router.route("/:id").patch(protect, updateUser).delete(protect, deleteUser)

module.exports = router
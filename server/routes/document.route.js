const express = require("express");
const router = express.Router()

const { validatorMiddleware } = require("../middleware/validatorMiddleware")
const { DocumentValidator } = require("../validators/document.validator")


const { protect } = require("../middleware/authMiddleware")

const { createDocument, getDocument, updateDocument, deleteDocument } = require("../controllers")

router.route("/").post(protect, DocumentValidator, validatorMiddleware, createDocument)
router.route("/").get(protect, getDocument)
router.route("/:id").patch(protect, updateDocument).delete(protect, deleteDocument)

module.exports = router
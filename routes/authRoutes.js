const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
router.delete("/", authController.delete);

module.exports = router;

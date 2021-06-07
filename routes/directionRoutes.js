const express = require("express");
const router = express.Router();
const directionController = require("../controllers/directionController");

router
  .route("/")
  .get(directionController.getAllDirections)
  .post(directionController.createDirection)

router
  .route("/:id")
  .get(directionController.getOneDirection)
  .patch(directionController.editDirection)
  .delete(directionController.deleteDirection)

router
  .route("/ferment/:id")
  .get(directionController.getFermentDirections)
  .delete(directionController.deleteFermentDirections)

module.exports = router

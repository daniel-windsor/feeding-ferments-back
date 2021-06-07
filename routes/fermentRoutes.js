const express = require("express");
const router = express.Router();
const fermentController = require("../controllers/fermentController");

router
  .route("/")
  .get(fermentController.getAllFerments)
  .post(fermentController.createFerment);

router
  .route("/:id")
  .get(fermentController.getOneFerment)
  .patch(fermentController.editFerment)
  .delete(fermentController.deleteFerment);

module.exports = router;

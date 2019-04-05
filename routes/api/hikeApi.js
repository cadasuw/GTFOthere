const router = require("express").Router();
const hikeController = require("../../controllers/hikeController");

// Matches with "/api/hike"
router
  .route("/")
  .get(hikeController.findAll);

module.exports = router;

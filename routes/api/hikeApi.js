const router = require("express").Router();
const hikeController = require("../../controllers/hikingController");

// Matches with "/api/hike"
router
  .route("/")
  .post(hikeController.add)
  .get(hikeController.findAll);

module.exports = router;

const path = require("path");
const router = require("express").Router();
const bookRoutes = require("./books");
const hikeRoutes = require("./hikeApi");
const googleRoutes = require("./google");
//const googleRoutes = require("./google");

// Book routes
router.use("/books", bookRoutes);


// Hike routes
router.use("/hikes", hikeRoutes);

// Google Routes
router.use("/google", googleRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/public/index.html"));
});

module.exports = router;
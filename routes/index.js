var express = require("express");
var router = express.Router();

const session = require("./utils/session");

/* GET home page. */
router.get("/", session, function(req, res, next) {
  res.render("index.hbs");
});

router.get("/about", (req, res, next) => {
  res.render("about.hbs");
});

module.exports = router;

var express = require("express");
var router = express.Router();

const User = require("../models/userSchema");

const expressValidator = require("express-validator");
router.use(expressValidator());

const registerValidation = require("./utils/registerValidation");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.redirect("/");
});

/* @Register Route*/
router.get("/register", (req, res, next) => {
  res.render("register.hbs");
});

router.post("/register", (req, res, next) => {
  const errors = registerValidation(req);
  // Check if there's an errors
  if (errors) {
    res.render("register.hbs", { errors });
  } else {
    const { username, email, password } = req.body;
    // Register the user
    User.register({ username, email, password }, res);
  }
});

/* @Login Route */
router.get("/login", (req, res, next) => {
  res.render("login.hbs");
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  User.login({ username, password }, { req, res });
});

/* @Logout Route */
router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;

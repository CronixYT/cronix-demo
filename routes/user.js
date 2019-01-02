var express = require("express");
var router = express.Router();

const fs = require("fs");

const uploadValidation = require("./utils/uploadValidation");
const upload = require("./utils/multer");

// Express-Validator
const { check, validationResult } = require("express-validator/check");
const expressValidator = require("express-validator");
router.use(expressValidator());

const Rjcode = require("../models/rjcodeSchema");

/* Middleware (Session) */
router.use(function(req, res, next) {
  if (!req.session.login) {
    res.redirect("/account/login");
  } else {
    next();
  }
});

/* GET home page. */
router.get("/", function(req, res, next) {
  let perPage = 6;
  let page = req.query.page || 1;

  Rjcode.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      if (err) {
        res.redirect("/user");
      }
      Rjcode.countDocuments().exec((err, count) => {
        if (err) res.redirect("/user");
        res.render("user.ejs", {
          products,
          current: page,
          pages: Math.ceil(count / perPage),
          user: req.session
        });
      });
    });
});

/* @Upload Router */
router.get("/upload", (req, res, next) => {
  res.render("upload.hbs");
});

router.post("/upload", upload.single("image"), (req, res, next) => {
  // console.log(req.file);
  const errors = uploadValidation.checkUpload(req);
  if (errors) {
    // Check if there's images
    if (req.file) {
      fs.unlink(`./uploads/${req.file.filename}`, err => {
        if (err) throw err;
      });
    }
    // Render errors
    res.render("upload.hbs", { errors });
  } else {
    Rjcode.findOne({ rjcode: `RJ${req.body.rjcode}` }, (err, result) => {
      if (err) throw err;
      console.log(result);
      if (!result) {
        // Upload to database
        const image = req.file
          ? "/uploads/default.jpg"
          : "/uploads/default.jpg";
        const rjcode = `RJ${req.body.rjcode}`;
        req.body.sfw = req.body.sfw !== undefined ? true : false;
        const newRjcode = new Rjcode({
          rjcode,
          url: req.body.url,
          image,
          sfw: req.body.sfw
        });
        newRjcode.save();
        res.render("upload.hbs", { success_msg: "Uploaded Successfuly!" });
      } else {
        res.render("upload.hbs", { errors: [{ msg: "RJ already exists" }] });
      }
    });
  }
});

module.exports = router;

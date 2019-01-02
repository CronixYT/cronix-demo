var express = require("express");
var router = express.Router();

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
  res.redirect("/");
});

router.get("/:id", function(req, res, next) {
  const { id } = req.params;
  Rjcode.findOne({ rjcode: `RJ${id}` }, (err, result) => {
    if (result) {
      // res.json({ result });
      res.render("rjcode.hbs", { result });
    } else {
      res.redirect("/");
    }
  });
});

router.get("/edit/:id", function(req, res, next) {
  const { id } = req.params;
  Rjcode.findOne({ rjcode: id }, (err, result) => {
    if (result) {
      res.render("rjcode_edit.hbs", { result });
    } else {
      res.redirect("/");
    }
  });
});

router.post("/edit/:id", function(req, res, next) {
  const rjcode = req.params.id;
  const { url } = req.body;
  req.body.sfw = req.body.sfw !== undefined ? true : false;
  Rjcode.findOneAndUpdate(
    { rjcode },
    { $set: { url, sfw: req.body.sfw } },
    (err, doc) => {
      if (err) throw err;
    }
  );
  res.redirect(`/rjcode/edit/${rjcode}`);
});

router.post("/edit/delete/:id", function(req, res, next) {
  const rjcode = req.params.id;
  Rjcode.findOneAndDelete({ rjcode }, (err, result) => {
    if (err) throw err;
  });
  res.redirect("/");
});

module.exports = router;

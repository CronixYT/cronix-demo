const { check, validationResult } = require("express-validator/check");

module.exports = [
  check("rjcode", "RJCode must be not empty")
    .not()
    .isEmpty(),
  check("rjcode", "RJCode must be a number").isNumeric(),
  check("rjcode", "RJCode must be inside the range (4-6 characters)").isLength({
    min: 4,
    max: 6
  }),
  check("url", "URL must be valid").isURL()
];

module.exports.checkUpload = function(req) {
  req.checkBody("rjcode", "RJCode must be not empty").notEmpty();
  req.checkBody("rjcode", "RJCode must be a number").isNumeric();
  req
    .checkBody("rjcode", "RJCode must be inside the range (4-6 characters)")
    .isLength({ min: 4, max: 6 });
  req.checkBody("url", "URL must be valid").isURL();
  return req.validationErrors();
};

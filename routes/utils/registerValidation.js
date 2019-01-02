module.exports = function(req) {
  req.checkBody("username", "Username must not be empty").notEmpty();
  req
    .checkBody("username", "Username must be atleast 4 characters")
    .isLength({ min: 4 });
  req.checkBody("email", "Email must not be empty").notEmpty();
  req.checkBody("password", "Password must not be empty").notEmpty();
  req
    .checkBody("password", "Password must be atleast 6 characters")
    .isLength({ min: 6 });
  req.checkBody("email", "Email must be valid!").isEmail();
  req
    .checkBody("cpassword", "Password doesn't matches")
    .equals(req.body.password);

  return req.validationErrors();
};

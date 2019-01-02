module.exports = function isLogged(req, res, next) {
  if (req.session.login) {
    res.redirect("/user");
  } else {
    next();
  }
};

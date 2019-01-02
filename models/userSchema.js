const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;

module.exports.login = function({ username, password }, { req, res }) {
  User.findOne({ username }, (err, result) => {
    if (result) {
      // pass
      bcrypt.compare(password, result.password, (err, success) => {
        if (success) {
          // pass (redirect to dashboard)
          req.session.login = true;
          req.session.username = result.username;
          res.redirect("/user");
        } else {
          res.render("login.hbs", {
            error_msg: "Invalid Username or Password"
          });
        }
      });
    } else {
      res.render("login.hbs", { error_msg: "Invalid Credentials" });
    }
  });
};

module.exports.register = function({ username, email, password }, res) {
  User.findOne({ $or: [{ username }, { email }] }, (err, result) => {
    if (err) res.redirect("/account/register");
    if (result) {
      let errors = [];
      if (result.username === username) {
        errors = [...errors, { msg: "Username already exists" }];
      }
      if (result.email === email) {
        errors = [...errors, { msg: "Email already exists" }];
      }
      return res.render("register.hbs", { errors });
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          const newUser = new User({
            username,
            email,
            password: hash
          });
          newUser.save();
          return res.render("register.hbs", { success_msg: true });
        });
      });
    }
  });
};

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const hbs = require("express-handlebars");

const indexRouter = require("./routes/index");
const accountRouter = require("./routes/account");
const userRouter = require("./routes/user");
const rjcodeRouter = require("./routes/rjcode");

// Connect to database
const connection = require("./bin/connection");
connection.start();

var app = express();

// view engine setup
app.engine("hbs", hbs({ extname: "hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: "Hello, Secret!",
    saveUninitialized: false,
    resave: false
  })
);
app.use("/assets", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.use("/", indexRouter);
app.use("/account", accountRouter);
app.use("/user", userRouter);
app.use("/rjcode", rjcodeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error.hbs");
});

module.exports = app;

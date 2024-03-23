const express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
var localStrategy = require("passport-local");

const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

var indexRouter = require("./routes/index");
var cityRouter = require("./routes/city");
var userModel = require("./models/user");

const connectDB = require("./database");
connectDB();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "adkkasdnfkj",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

var PORT = process.env.PORT || 8000;
app.set("PORT", PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

const server = app.listen(PORT, () => {
  console.log(`connected to server at ${PORT}`);
});

module.exports = server;

const express = require("express");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

var indexRouter = require("./routes/indexRouter");
var adminRouter = require("./routes/adminRouter");
var userModel = require("./models/userModel");

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
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var PORT = process.env.PORT || 8000;
app.set("PORT", PORT);

app.use("/", indexRouter);
app.use("/admin", adminRouter);

const server = app.listen(PORT, () => {
  console.log(`connected to server at ${PORT}`);
});

module.exports = server;

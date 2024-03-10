const express = require("express");
const app = express();

const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

var indexRouter = require("./routes/index");

const connectDB = require("./database");
connectDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.join(__dirname, "public")));

var PORT = process.env.PORT || 8000;
app.set("PORT", PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

const server = app.listen(PORT, () => {
  console.log(`connected to server at ${PORT}`);
});

module.exports = server;

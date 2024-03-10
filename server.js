const express = require("express");
const app = express();

const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const connectDB = require("./database");
connectDB();

app.set("view engine", "ejs");
app.set("view", path.resolve("./views"));
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;
app.set("PORT", PORT);

app.use(express.json());
app.use(express.urlencoded({ urlencoded: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const server = app.listen(PORT, () => {
  console.log(`connected to db at ${PORT}`);
});

module.exports = server;

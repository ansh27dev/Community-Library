const express = require("express");
const router = express.Router();
const localStrategy = require("passport-local");

const userModel = require("../models/user");
const bookModel = require("../models/book");
const passport = require("passport");

passport.use(new localStrategy(userModel.authenticate()));

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", isLoggedin, async (req, res) => {
  const username = req.user.username;
  const user = await userModel.findOne({ username: username });
  const donatedBook = await bookModel.find({ donatedBy: user._id });
  res.render("profile", { donatedBook, user });
});

router.get("/listing/:city", async (req, res) => {
  const reqCity = req.params.city;
  const usersInCity = await userModel.find({ city: reqCity });
  const usersId = usersInCity.map((user) => user._id);
  const booksInCity = bookModel.find({
    donatedBy: { $in: usersId },
    availability: true,
  });
  res.render("listing", { cityData: reqCity, bookListings });
});

router.get("/admin/:id", (req, res) => {
  res.render("admin", { id });
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

router.post("/register", async (req, res) => {
  const createdUser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    username: req.body.username,
    password: req.body.password,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
  });

  userModel
    .register(createdUser, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

router.post("/profile", async (req, res) => {
  const donatedBook = await bookModel.create({
    bookName: req.body.bookName,
    publisher: req.body.publisher,
    author: req.body.author,
    ISBN: req.body.ISBN,
  });
  res.redirect("/profile");
});

router.post("/admin/:id", (req, res) => {
  res.render("admin", { id });
});

function isLoggedin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile/:id", (req, res) => {
  const userId = req.user._id;
  const user = userModel.findOne({});
  res.render("profile");
});

router.get("/listing/:city", (req, res) => {
  const reqCity = req.params.city;
  const cityData = res.render("listing", { cityData });
});

router.get("/admin/:id", (req, res) => {
  res.render("admin", { id });
});

router.post("/login", (req, res) => {
  res.render("login");
});

router.post("/register", (req, res) => {
  res.render("register");
});

router.post("/donate", (req, res) => {
  res.render("profile");
});

router.post("/admin/:id", (req, res) => {
  res.render("admin", { id });
});

module.exports = router;

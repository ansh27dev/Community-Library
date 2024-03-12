const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.post("/register", (req, res) => {
  res.render("register");
});

router.get("/listing/:city", (req, res) => {
  res.render("listing");
});

router.get("/profile/:id", (req, res) => {
  const id = req.id.params;
  res.render("profile", { id });
});

router.post("/login", (req, res) => {
  res.render("login", { id });
});

router.post("/admin/:id", (req, res) => {
  res.render("admin", { id });
});

module.exports = router;

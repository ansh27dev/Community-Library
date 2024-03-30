const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const userModel = require("../models/userModel");
const bookModel = require("../models/bookModel");

router.get("/", (req, res) => {
  return res.render("home");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/register", (req, res) => {
  return res.render("register");
});

router.get("/listing/:city", async (req, res) => {
  const reqCity = req.params.city;
  const usersInCity = await userModel.find({ city: reqCity });
  const usersId = usersInCity.map((user) => user._id);
  const foundBook = await bookModel.find({
    donatedBy: { $in: usersId },
    availability: true,
  });
  return res.render("listing", { foundBook });
});

router.get("/logout", function (req, res, next) {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
    });

    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("Incomplete form");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      console.log("User doesn't exist");
      return res.status(404).send("User doesn't exist");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Incorrect password");
      return res.status(401).send("Incorrect password");
    }

    const token = jwt.sign({ id: user._id, email }, process.env.SECRET, {
      expiresIn: "1h",
    });

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, options);

    return res.redirect("/profile");
  } catch (err) {
    console.error("Error occurred during login:", err);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, phoneNumber, password, country, state, city } =
      req.body;

    if (
      !(name && email && phoneNumber && password && country && state && city)
    ) {
      return res.status(400).send("all fields are compulsory");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("user already exists");
    }

    const encPassword = await bcrypt.hash(password, 10);

    const createdUser = new userModel({
      name,
      email,
      phoneNumber,
      password: encPassword,
      country,
      state,
      city,
    });
    await createdUser.save();

    const token = jwt.sign({ id: createdUser._id, email }, process.env.SECRET, {
      expiresIn: "1h",
    });

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options);

    return res.redirect("/profile");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/profile", auth, async (req, res) => {
  const foundBook = await bookModel.find({ donatedBy: req.userData._id });

  return res.render("profile", { user: req.userData, foundBook });
});

router.post("/profile", auth, async (req, res) => {
  const donatedBook = await bookModel.create({
    bookName: req.body.bookName,
    publisher: req.body.publisher,
    author: req.body.author,
    ISBN: req.body.ISBN,
    donatedBy: req.userData._id,
  });
  const foundBook = await bookModel.find({ donatedBy: req.userData._id });
  return res.render("profile", { user: req.userData, foundBook });
});

module.exports = router;

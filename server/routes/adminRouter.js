const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authAdmin = require("../middlewares/authAdmin");

const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const bookModel = require("../models/bookModel");
const issueModel = require("../models/issueModel");

router.post("/register", async (req, res) => {
  try {
    const { email, phoneNumber, password, country, state, city } = req.body;

    if (!(email && phoneNumber && password && country && state && city)) {
      return res.status(400).send("all fields are compulsory");
    }

    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("user already exists");
    }

    const encPassword = await bcrypt.hash(password, 10);

    const createdAdmin = new adminModel({
      email,
      phoneNumber,
      password: encPassword,
      country,
      state,
      city,
    });
    await createdAdmin.save();

    const token = jwt.sign(
      { id: createdAdmin._id, email },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(201).json({ token, redirect: `/admin/${city}` });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/register", (req, res) => {
  res.render("admin-register");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("incomplete form");
    }

    const admin = await adminModel.findOne({ email });
    if (!user) {
      res.send("admin doesnt exist");
    }

    let token;
    if (await bcrypt.compare(password, admin.password)) {
      token = jwt.sign({ id: admin._id, email }, process.env.SECRET, {
        expiresIn: "1h",
      });
    }

    //cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options);
    res.redirect(`/admin/${city}`);
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", (req, res) => {
  res.render("admin-login");
});

router.get("/:city", authAdmin, async (req, res) => {
  const reqCity = req.params.city;
  const usersInCity = await userModel.find({ city: reqCity });
  const usersId = usersInCity.map((user) => user._id);
  const availableBooks = await bookModel.find({
    donatedBy: { $in: usersId },
    availability: true,
  });

  const unAvailableBooks = await bookModel.find({
    donatedBy: { $in: usersId },
    availability: false,
  });

  res.render("admin", { availableBooks, unAvailableBooks });
});

router.post("/issue", async (req, res) => {
  const { issuerName, issuerEmail, isbnIssueField } = req.body;

  const createdIssue = new issueModel({
    issuerName,
    issuerEmail,
    isbnIssueField,
  });
  await createdIssue.save();

  await bookModel
    .findOneAndUpdate(
      { ISBN: isbnIssueField },
      { $set: { availability: false } }
    )
    .then((updatedBook) => {
      if (updatedBook) {
        console.log("Book availability marked as false:", updatedBook);
      } else {
        console.log("Book not found with ISBN:", isbnIssueField);
      }
    })
    .catch((error) => {
      console.error("Error marking book availability as false:", error);
    });
  res.render("admin", { availableBooks, unAvailableBooks });
});

router.post("/unissue", async (req, res) => {
  const { isbn } = req.body;

  await issueModel
    .findOneAndUpdate({ isbn: isbn }, { $set: { bookReturned: true } })
    .then((unissue) => {
      if (unissue) {
        console.log("Book unissued:", unissue);
      } else {
        console.log("Book not found with ISBN:", isbnIssueField);
      }
    })
    .catch((error) => {
      console.error("Error in unissuing:", error);
    });

  await bookModel
    .findOneAndUpdate(
      { ISBN: isbnIssueField },
      { $set: { availability: true } }
    )
    .then((updatedBook) => {
      if (updatedBook) {
        console.log("Book availability marked as true:", updatedBook);
      } else {
        console.log("Book not found with ISBN:", isbnIssueField);
      }
    })
    .catch((error) => {
      console.error("Error marking book availability as false:", error);
    });
  res.render("admin", { availableBooks, unAvailableBooks });
});

module.exports = router;

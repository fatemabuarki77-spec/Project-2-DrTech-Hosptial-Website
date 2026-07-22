const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Profile = require("../models/profile.js");
const bcrypt = require("bcrypt");

// Sign up routes
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
    return res.send("Username already taken.");
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  await User.create(req.body);
  res.redirect("/auth/sign-in");
});

// Sign in routes
router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.post("/sign-in", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) {
    return res.send("Login failed. Please try again.");
  }

  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password,
  );
  if (!validPassword) {
    return res.send("Login failed. Please try again.");
  }

  // Set session data
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
    role: userInDatabase.role,
  };

  // Save session explicitly before redirecting
  req.session.save(async (err) => {
    if (err) {
      console.error(err);
      return res.send("Session error, please try again.");
    }

    if (req.session.user.role === "doctor") {
      const userProfile = await Profile.findOne({ name: req.session.user._id });
      if (userProfile == null) {
        return res.render("create-profile.ejs", {
          name: req.session.user.username,
          id: req.session.user._id,
        });
      }
    }

    res.redirect("/");
  });
});

// Sign out route
router.get("/sign-out", (req, res) => {
  // Pass a callback to destroy() so the redirect ONLY happens after completion
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    // Clear the session cookie on the client side
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = router;

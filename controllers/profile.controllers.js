const express = require("express");
const router = express.Router();
const Profile = require(`../models/profile`);

router.get("/:id", async (req, res) => {
  try {
    const myID = String(req.session.user._id);
    const myProfile = await Profile.findOne({ name: req.params.id }).populate(
      "name",
    );
    console.log(myID);
    console.log(myProfile);

    res.render("profile-details.ejs", {
      myProfile: myProfile,
    });

    if (myProfile === null) {
      return res.status(404).send("Profile not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 1. Render the Edit Form
router.get("/:id/edit", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate("name");

    if (profile === null) {
      return res.status(404).send("Profile not found");
    }

    res.render("edit-profile.ejs", { myProfile: profile });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 2. Handle Profile Update
router.put("/:id", async (req, res) => {
  try {
    const { specialty, position, experience, Availability } = req.body;

    const isAvailable = Availability === "true";

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        specialty,
        position,
        experience,
        Availability: isAvailable,
      },
      { new: true, runValidators: true },
    );

    res.redirect(`/profile/${updatedProfile._id}`);
  } catch (err) {
    res.status(400).send(`Error updating profile: ${err.message}`);
  }
});

// 1. GET: Render the creation form, passing all system users to bind to the profile
router.get("/new", async (req, res) => {
  try {
    const users = await User.find({});
    res.render("create-profile", { users });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 2. POST: Process the new profile creation
router.post("/new", async (req, res) => {
  try {
    const { specialty, position, experience, Availability } = req.body;
    const isAvailable = Availability === "true";

    const newProfile = new Profile({
      name: req.session.user._id,
      specialty,
      position,
      experience,
      Availability: isAvailable,
    });

    await newProfile.save();
    // res.redirect(`/profile/${newProfile._id}`);
    res.redirect("/");
  } catch (err) {
    res.status(400).send(`Error creating profile: ${err.message}`);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
const Profile = require("../models/profile");
const PatientList = require("../models/patientslist");
const User = require("../models/User");
const isSignedIn = require("../middleware/is-signed-in");

router.get("/dashboard", async (req, res) => {
  try {
    const doctorId = req.session.user._id;

    const doctorProfile = await Profile.findOne({ name: doctorId }).populate(
      "name",
      "username",
    );

    const assignedBookings = await Booking.find({ provider: doctorId })
      .populate("patient", "username name")
      .populate("service")
      .sort({ date: 1 });
  } catch (error) {
    console.error("Doctor dashboard load error:", error);
    res.status(500).send("Server Error: Unable to fetch dashboard.");
  }
});

router.put("/availability", isSignedIn, async (req, res) => {
  try {
    const doctorId = req.session.user._id;
    const { Availability } = req.body;

    const updatedProfile = await Profile.findOneAndUpdate(
      { name: doctorId },
      { Availability: Availability === "true" },
      { new: true },
    );

    if (!updatedProfile) {
      return res.status(404).send("Professional profile not found.");
    }

    res.redirect("/doctor/dashboard");
  } catch (error) {
    console.error("Availability update error:", error);
    res.status(500).send("Error updating availability status.");
  }
});

router.get("/patient/:id", isSignedIn, async (req, res) => {
  const patient = await PatientList.findById(req.params.id);

  res.render("patient-chart", {
    patient,
    user: req.session.user,
  });
});
router.get("/all-doc", async (req, res) => {
  const allDocs = await Profile.find({}).populate("name");
  res.render("all-doctors.ejs", { allDocs });
});

router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.profile ? req.query.profile.trim() : "";
    let search = {};

    console.log(searchQuery);
    if (searchQuery) {
      const matchingUsers = await User.find({
        username: { $regex: searchQuery, $options: "i" },
      }).select("_id");

      const userIds = matchingUsers.map((user) => user._id);

      search = { name: { $in: userIds } };
      console.log(userIds);
    }
    console.log(search);
    const allDocs = await Profile.find(search).populate("name");

    console.log(allDocs);
    res.render("all-doctors.ejs", {
      allDocs,
      searchQuery,
    });
  } catch (err) {
    console.error("Doctor search error:", err);
    res.redirect("/");
  }
});
module.exports = router;

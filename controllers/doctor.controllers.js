const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
const Profile = require("../models/profile");
const PatientList = require("../models/patientslist");
const Service = require("../models/services");
const isSignedIn = require("../middleware/is-signed-in");

router.get("/dashboard", async (req, res) => {
  try {
    const doctorId = req.session.user._id;

    const doctorProfile = await Profile.findOne({ name: doctorId }).populate(
      "name",
      "username",
    );

    // B. Retrieve all bookings registered with this doctor, populating patient info and service details
    const assignedBookings = await Booking.find({ provider: doctorId })
      .populate("patient", "username name")
      .populate("service")
      .sort({ date: 1 });
  } catch (error) {
    console.error("Doctor dashboard load error:", error);
    res.status(500).send("Server Error: Unable to fetch dashboard.");
  }
});

// 2. UPDATE: Toggle Availability status inline
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

// 4. GET: Render Add Service Form
router.get("/services/new", (req, res) => {
  res.render("add-service.ejs", { user: req.session.user });
});

// 5. CREATE: Publish New Medical Service linked to the logged-in doctor
router.post("/services", isSignedIn, async (req, res) => {
  try {
    const doctorId = req.session.user._id;
    const { name, description } = req.body;

    await Service.create({
      Name: name,
      Description: description,
      provider: doctorId,
    });

    res.redirect("/doctor/dashboard");
  } catch (error) {
    console.error("Service creation error:", error);
    res.status(500).send("Server Error: Unable to publish hospital service.");
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
    let search = {};

    if (req.query.profile) {
      const userinfo = await User.findOne({
        name: {
          $regex: req.query.profile,
          $options: "i",
        },
      });

      if (!userinfo) {
        return res.render("all-doctors.ejs", {
          allDocs: [],
          searchQuery: req.query.profile,
        });
      }

      search = { name: userinfo._id };
    }

    const allDocs = await Profile.find(search).populate("name");

    res.render("all-doctors.ejs", {
      allDocs,
      searchQuery: req.query.profile || "",
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
module.exports = router;

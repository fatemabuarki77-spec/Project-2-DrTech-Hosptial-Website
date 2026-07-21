const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
const Profile = require("../models/profile");

// 1. READ: Get Patient Dashboard (All Appts)
router.get("/new", async (req, res) => {
  try {
    const patientHistory = await Booking.find({
      patient: req.session.user._id,
    }).populate("provider");

    const apptType = ["in-person", "telehealth"];

    const doctors = await Profile.find({
      Availability: true,
    }).populate("name");

    res.render("dashboard-pt.ejs", {
      patientHistory,
      doctors,
      user: req.session.user,
      apptType,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).send("Server Error loading dashboard.");
  }
});
router.get("/doc-appts", async (req, res) => {
  const profile = await Profile.findOne({ name: req.session.user._id });
  const docAppt = await Booking.find({ provider: profile._id }).populate(
    "patient",
  );
  console.log(docAppt);
  res.render("schedule.ejs", { docAppt });
});
// 2. CREATE: Submit a New Appointment

// router.post("/", async (req, res) => {
//   try {
//     const { date, appttype } = req.body;

//     await Booking.create({
//       patient: req.session.user._id,
//       provider: req.body.provider,

//       appttype: "in-person",
//       status: "Pending",
//     });

//     res.redirect("/appt/new");
//   } catch (error) {
//     console.error("Booking error:", error);
//     res.status(500).send("Error creating appointment.");
//   }
// });

// 3. UPDATE: Edit an Appointment Form & Submission

// Get individual appointment to edit
router.get("/:id/edit", async (req, res) => {
  try {
    const appointment = await Booking.findById(req.params.id);
    const doctors = await User.find({ role: "Doctor" });

    if (appointment.patient.toString() !== req.session.user._id.toString()) {
      return res.status(401).send("Unauthorized");
    }

    res.render("edit-appt.ejs", { appointment, doctors });
  } catch (error) {
    res.status(500).send("Error retrieving appointment.");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { providerId, date, appttype } = req.body;

    await Booking.findByIdAndUpdate(req.params.id, {
      provider: providerId,
      date: new Date(date),
      appttype: appttype,
    });

    res.redirect("/appt/new");
  } catch (error) {
    res.status(500).send("Error updating appointment.");
  }
});

// 4. DELETE: Cancel/Remove an Appointment

router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Booking.findById(req.params.id);

    if (appointment.patient.toString() !== req.session.user._id.toString()) {
      return res.status(401).send("Unauthorized");
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.redirect("/appt/new");
  } catch (error) {
    res.status(500).send("Error deleting appointment.");
  }
});
router.post("/book", async (req, res) => {
  try {
    const patientId = req.session.user._id;

    console.log(req.body);
    const { provider, date, type } = req.body;

    await Booking.create({
      patient: patientId,
      provider: provider,
      date: req.body.date,
      time: req.body.time,
      appttype: req.body.appttype,
      status: "Pending",
    });

    res.redirect("/appt/new");
  } catch (error) {
    console.log(error);

    res.status(500).send("Booking failed");
  }
});
router.get("/dashboard", async (req, res) => {
  try {
    const doctors = await Profile.find({
      Availability: true,
    }).populate("name", "username");

    res.render("dashboard-pt.ejs", {
      user: req.session.user,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading dashboard");
  }
});

module.exports = router;

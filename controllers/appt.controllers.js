const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
const Profile = require("../models/profile");
const isSignedIn = require("../middleware/is-signed-in");

router.get("/", (req, res) => {
  console.log(req.session.user);
  res.render("homepage.ejs", { user: req.session.user });
});
router.get("/new", isSignedIn, async (req, res) => {
  try {
    const patientHistory = await Booking.find({
      patient: req.session.user._id,
    }).populate({
      path: "provider",
      populate: {
        path: "name",
      },
    });

    console.log(patientHistory);

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
router.get("/doc-appts", isSignedIn, async (req, res) => {
  const profile = await Profile.findOne({ name: req.session.user._id });
  const docAppt = await Booking.find({ provider: profile._id }).populate(
    "patient",
  );
  console.log(docAppt);
  res.render("schedule.ejs", { docAppt });
});

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
router.get("/:id/edit", isSignedIn, async (req, res) => {
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

router.put("/:id", isSignedIn, async (req, res) => {
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

router.delete("/:id", isSignedIn, async (req, res) => {
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
router.post("/book", isSignedIn, async (req, res) => {
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
router.get("/dashboard", isSignedIn, async (req, res) => {
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

router.get("/:id/notes", isSignedIn, async (req, res) => {
  try {
    const appointment = await Booking.findById(req.params.id)
      .populate("patient")
      .populate({
        path: "provider",
        populate: { path: "name" },
      });

    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }

    res.render("clinic-notes.ejs", { appointment, user: req.session.user });
  } catch (error) {
    console.error("Error fetching clinic notes:", error);
    res.status(500).send("Error loading clinic notes");
  }
});
router.get("/:id/notes", isSignedIn, async (req, res) => {
  try {
    const appointment = await Booking.findById(req.params.id)
      .populate("patient")
      .populate({
        path: "provider",
        populate: { path: "name" },
      });

    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }

    res.render("clinic-notes.ejs", { appointment, user: req.session.user });
  } catch (error) {
    console.error("Error fetching clinic notes:", error);
    res.status(500).send("Error loading clinic notes");
  }
});

router.post("/:id/notes", isSignedIn, async (req, res) => {
  try {
    const { notes, labRequests, customLabs, xrayRequests, customXrays } =
      req.body;

    const formattedLabs = Array.isArray(labRequests)
      ? labRequests
      : labRequests
        ? [labRequests]
        : [];

    const formattedXrays = Array.isArray(xrayRequests)
      ? xrayRequests
      : xrayRequests
        ? [xrayRequests]
        : [];

    await Booking.findByIdAndUpdate(req.params.id, {
      notes: notes,
      labRequests: formattedLabs,
      customLabs: customLabs,
      xrayRequests: formattedXrays,
      customXrays: customXrays,
      status: "Completed",
    });

    res.redirect("/appt/doc-appts");
  } catch (error) {
    console.error("Error saving clinic notes and orders:", error);
    res.status(500).send("Error saving clinic notes");
  }
});

module.exports = router;

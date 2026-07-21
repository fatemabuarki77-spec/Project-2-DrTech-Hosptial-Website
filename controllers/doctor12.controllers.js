const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");

router.get("/doctor/new", (req, res) => {
  res.render("schedule.ejs");
});

// 1. View daily schedule
router.get("/doctor/schedule", async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const scheduleQuery = {
      doctor: req.user._id,
      date: {
        $GreaterThanOrEqual: startOfDay,
        $LessThanOrEqual: endOfDay,
      },
      status: {
        $NotEqual: "Cancelled",
      },
    };

    const scheduleFound = await Booking.find(scheduleQuery).populate("patient");
    res.render("doctor/schedule", { schedule: scheduleFound });
  } catch (error) {
    console.error("Cannot load schedule:", error);
    res.status(500).send("Error loading schedule");
  }
});

// 2. View patient file (History & requested services)
router.get("/doctor/appointment/:appointmentId", async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    const appointmentFound =
      await Booking.findById(appointmentId).populate("patient");

    res.render("doctor/patient-detail", { appointment: appointmentFound });
  } catch (error) {
    console.error("Cannot load patient details:", error);
    res.status(500).send("Error loading patient details");
  }
});

// 4. Schedule next appointment for current patient
router.post("/doctor/schedule-next", async (req, res) => {
  try {
    const incomingPatientId = req.body.patientId;
    const nextDate = req.body.date;
    const visitType = req.body.type;

    await Booking.create({
      patient: incomingPatientId,
      doctor: req.user._id,
      date: nextDate,
      type: visitType,
    });

    res.redirect("/doctor/schedule");
  } catch (error) {
    console.error("Cannot schedule next visit:", error);
    res.status(500).send("Error scheduling next visit");
  }
});

module.exports = router;

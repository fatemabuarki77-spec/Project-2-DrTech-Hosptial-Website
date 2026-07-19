const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
//const User = require("../models/User");
const Service = require("../models/services");

// 1. READ: Get Patient Dashboard (All Appts)

router.get("/new", async (req, res) => {
  try {
    // Find all bookings matching logged-in patient, populate references
    const patientHistory = await Booking.find({
      patient: req.session.user._id,
    }).populate({
      path: "service",
      populate: {
        path: "provider",
        select: "username",
      },
    });
    // Fetch doctors and services to populate booking dropdowns in view
    const availableServices = await Service.find({}).populate("provider");

    res.render("schedule.ejs", {
      patientHistory,
      availableServices,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).send("Server Error loading dashboard.");
  }
});

// 2. CREATE: Submit a New Appointment

router.post("/", async (req, res) => {
  try {
    const { serviceId, date, appttype } = req.body;

    await Booking.create({
      patient: req.session.user._id,
      provider: selectedService.provider,
      date: new Date(date),
      appttype: appttype,
      status: "Pending",
    });

    res.redirect("/appt/new");
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).send("Error creating appointment.");
  }
});

// 3. UPDATE: Edit an Appointment Form & Submission

// Get individual appointment to edit
router.get("/:id/edit", async (req, res) => {
  try {
    const appointment = await Booking.findById(req.params.id);
    const doctors = await User.find({ role: "Doctor" });
    const services = await Service.find({});

    if (appointment.patient.toString() !== req.session.user._id.toString()) {
      return res.status(401).send("Unauthorized");
    }

    res.render("edit-appt.ejs", { appointment, doctors, services });
  } catch (error) {
    res.status(500).send("Error retrieving appointment.");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { providerId, serviceId, date, appttype } = req.body;

    await Booking.findByIdAndUpdate(req.params.id, {
      provider: providerId,
      service: serviceId,
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

module.exports = router;

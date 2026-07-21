const express = require("express");
const router = express.Router();
const Patient = require(`../models/patientslist`);
const isSignedIn = require("../middleware/is-signed-in");

router.get("/new", (req, res) => {
  res.render("patients-create.ejs");
});

router.post(`/new`, isSignedIn, async (req, res) => {
  try {
    req.body.IsReadyToDischarge = Boolean(req.body.IsReadyToDischarge);
    console.log(req.body);
    const createdPatient = await Patient.create(req.body);
    console.log(createdPatient.id);
    res.redirect(`/`);
  } catch (err) {
    console.log(`cannot add patient`, err);
  }
});

router.get("/", isSignedIn, async (req, res) => {
  try {
    const allPatients = await Patient.find();
    res.render("all-patients.ejs", { Patients: allPatients });
  } catch (err) {
    console.log(`cannot find patient`, err);
  }
});

router.get("/:id", isSignedIn, async (req, res) => {
  try {
    console.log(req.params.id);

    const foundPatient = await Patient.findById(req.params.id);

    console.log(foundPatient);
    if (!foundPatient) {
      return res.status(404).send("Patient not found");
    }

    res.render("patients-details.ejs", { Patient: foundPatient });
  } catch (err) {
    console.log("Cannot find patient ID", err);
    res.status(404).send("Patient not found");
  }
});

router.delete("/:id", isSignedIn, async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.log(`cannot Delete patient`, err);
  }
});

router.get("/:id/edit", isSignedIn, async (req, res) => {
  try {
    const foundPatient = await Patient.findById(req.params.id);
    res.render("edit-patients.ejs", { Patient: foundPatient });
  } catch (err) {
    console.log(`cannot Delete patient by id`, err);
  }
});

router.put("/:id", isSignedIn, async (req, res) => {
  try {
    req.body.IsReadyToDischarge = Boolean(req.body.IsReadyToDischarge);
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    res.redirect(`${req.params.id}`);
  } catch (err) {
    console.log(`cannot Update patient`, err);
  }
});

module.exports = router;

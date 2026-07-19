const express = require("express");
const router = express.Router();
const Service = require("../models/services");

// 1. GET Route: Render the form to add a new service
router.get("/new", (req, res) => {
  res.render("new-service.ejs");
});

router.post("/services", async (req, res) => {
  try {
    const { name, description } = req.body;
    await Service.create({
      name: name,
      description: description,
      provider: req.session.user._id,
    });

    res.redirect("/doctor/schedule"); // Change this path to actual doctor dashboard route
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).send("Error adding service.");
  }
});

module.exports = router;

const Patient = require(`./models/patients`);

app.get("/patients/new", (req, res) => {
  res.render("patients-create.ejs");
});

app.post(`/patients`, async (req, res) => {
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
// post the fields you need from the body
// app.post("/patients", async (req, res) => {
//   try {
//
//     const newPatient = {
//       name:req.body.name,
//       gender:req.body.gender,
//       illness::req.body.illness
//       IsReadyToDischarge::req.body.IsReadyToDischarge,
//     };

//     const createdPatient = await Patient.create(newPatient);

//     res.redirect("/");
//   } catch (err) {
//     console.error("Cannot add patient:", err);
//     res.status(500).send("Error creating patient");
//   }
// });
//Read Routes

app.get("/patients", async (req, res) => {
  try {
    const allPatients = await Patient.find();
    res.render("all-patients.ejs", { Patients: allPatients });
  } catch (err) {
    console.log(`cannot find patient`, err);
  }
});

//
app.get("/patients/:id", async (req, res) => {
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

app.delete("/patients/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.redirect("/patients");
  } catch (err) {
    console.log(`cannot Delete patient`, err);
  }
});

app.get("/patients/:id/edit", async (req, res) => {
  try {
    const foundPatient = await Patient.findById(req.params.id);
    res.render("edit-patients.ejs", { Patient: foundPatient });
  } catch (err) {
    console.log(`cannot Delete patient by id`, err);
  }
});

app.put("/patients/:id", async (req, res) => {
  try {
    req.body.IsReadyToDischarge = Boolean(req.body.IsReadyToDischarge);
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    res.redirect("/patients");
  } catch (err) {
    console.log(`cannot Update patient`, err);
  }
});

// post the fields you need from the body//
// try {
//
//     const updatedPatient = {
//       name:req.body.name,
//       gender:req.body.gender,
//       illness::req.body.illness
//       IsReadyToDischarge::req.body.IsReadyToDischarge,
//     };

//     await Patient.findByIdAndUpdate(req.params.id, updatedPatient);

//     res.redirect("/patients");
//   } catch (err) {
//     console.error("Cannot add patient:", err);
//     res.status(500).send("Error creating patient");
//   }
// });
app.get("/", (req, res) => {
  res.render("index");
});

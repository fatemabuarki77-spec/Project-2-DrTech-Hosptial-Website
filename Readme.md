# Project Name

🏥 Med-Tech Hospital Web Application

## Overview

A full-stack healthcare web application designed to streamline appointment booking for patients and provide doctors with a comprehensive management system for consultations, internal service requests, and patient medical history.

## Screenshots

![alt text](<Screenshot 2026-07-16 at 2.44.45 PM.png>)

## 🛠️ Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB (with Mongoose ODM)

## Getting Started

## Installation

## User Stories

😷Patients:

- As a Patient, I want to search for doctors by specialty.
- As a Patient , I want to book or cancel an appointment that fits my schedule.
- As a Patient, I want to view my upcoming and past appointments so that I can keep track of my medical visits.
- As a Patient, I want to choose between an in-person or a telehealth (video) appointment during the booking process.

👨🏼‍⚕️👩🏻‍⚕️Doctors:

- As a Doctor, I want to see a consolidated list of my scheduled patients for the day and Edit it.
- As a Doctor, I want to click on a patient from my list to view their medical history and any requested services, so that I am fully prepared before they walk into the room.
- As a Doctor,I must be able to change the status of the request (e.g. "Pending," "Assigned," "Completed").
- As a Doctor, I want to write a consultation notes during the visit.
- As a Doctor , I can request internal hospital services (e.g.,lab tests, imaging, or specialist referrals), so that the patient's care plan is set before they leave.
- As a Doctor ,I can Schedule my next appointment for the patient I am seeing.

## Database Design

The MongoDB database consists of four core collections:

- Users (User): Stores credentials, user role (Patient or Doctor), contact details, and basic profile info.
- Doctors (Doctor): References a User document; includes specialty, availability slots, and consultation options.
- Appointments (Appointment): Maps a Patient to a Doctor; contains date, time, appointment type (In-Person or Telehealth), status (Pending, Assigned, Completed, Cancelled), and consultation notes.

## Routes

| method | Route          | Description                       |
| ------ | -------------- | --------------------------------- |
| POST   | /auth/register | Register a new patient or doctor  |
| POST   | /auth/login    | Authenticate user & start session |
| GET    | /users/profile | Fetch logged-in user profile      |
|        |                |                                   |

Patient Routes
| method | Route | Description |
|---------------|---------------------------------------------|---------------------------------------------------|
| GET | / | Search doctors by specialty |
| POST | /api/appointments | Book a new appointment |
| GET | /api/appointments/my-appointments | View patient's past and upcoming visits |
| DELETE | /api/appointments/:id | Cancel an appointment |
|
|
Doctor Routes
| method | Route | Description |
|----------------|------------------------------------------|---------------------------------------------------------------|
| GET | /doctor/schedule | Retrieve scheduled patients for the day |
| PUT | /appointments/:id | Update appointment details or status |
| GET | /patients/:id/history | Retrieve full medical history for a patient |
| POST | /appointments/:id/notes | Add/update consultation notes |
| POST | /services/request | Issue internal service orders (labs, imaging, referrals) |

## Features

- Dual Role Dashboards: Custom views and workflows tailored specifically for patients vs. medical professionals.

- Flexible Consultation Options: Seamless booking for both in-person clinic visits and virtual telehealth appointments.

- Clinical Workflow Automation: Enables doctors to manage patient status, attach consultation notes, order lab work, and set follow-up visits in one view.

- Specialty Filtering: Fast, indexed doctor searching by medical specialty.

## Future Enhancements

- WebRTC Integration: Live video streaming directly inside the app for telehealth consultations.

- Automated Notifications: Email and SMS reminders for upcoming appointments and lab test results.

- Online Payments: Integration with payment gateways (e.g., Stripe) for pre-paying consultation fees.

- Prescription Module: Electronic prescription (e-Rx) generation with direct export to PDF.

## Credits

Developed by Dr. Tech Team as part of the hospital digital infrastructure initiative.

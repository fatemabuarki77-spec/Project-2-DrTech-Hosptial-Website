# Project Name

🏥 Med-Tech Hospital Web Application

## Overview

A full-stack healthcare web application designed to streamline appointment booking for patients and provide doctors with a comprehensive management system for consultations, internal service requests, and patient medical history.

## Screenshots

![alt text](<Screenshot 2026-07-23 at 9.10.12 AM.png>)
![alt text](<Screenshot 2026-07-23 at 9.10.29 AM.png>)
![alt text](<Screenshot 2026-07-22 at 9.37.52 PM.png>)
![alt text](<Screenshot 2026-07-23 at 9.20.01 AM.png>)
![alt text](<Screenshot 2026-07-23 at 9.28.06 AM.png>)

## 🛠️ Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Database: MongoDB

## Getting Started

To get a local copy of ** Med-Tech ** up and running on your development environment, follow these steps.

Ensure you have the following installed on your system:

- **Node.js** (v16.x or higher) — [Download Node.js](https://nodejs.org/)
- **npm** (comes bundled with Node.js)
- **MongoDB** — Local instance running via [MongoDB Community Server](https://www.mongodb.com/try/download/community) or a free cloud database cluster via [MongoDB Atlas](https://www.mongodb.com/atlas).

---

## Installation

**Clone the Repository**

`bash`
git clone [https://github.com/your-username/dr-tech.git](https://github.com/your-username/dr-tech.git)
cd dr-tech
The Deployed Website :https://med-tech-hosptial-website.onrender.com

## User Stories

😷Patients:

- As a Patient, I want to search for doctors by Name.
- As a Patient , I want to book or cancel an appointment that fits my schedule.
- As a Patient, I want to view my upcoming and past appointments so that I can keep track of my medical visits.
- As a Patient, I want to choose between an in-person or a telehealth (video) appointment during the booking process.

👨🏼‍⚕️👩🏻‍⚕️Doctors:

- As a Doctor, I want to see a consolidated list of my scheduled patients for the day and Edit it.
- As a Doctor, I want to click on a patient from my list to view their medical history and any requested services, so that I am fully prepared before they walk into the room.
- As a Doctor,I must be able to change the status of the request (e.g. "Pending"," "Completed").
- As a Doctor, I want to write a consultation notes during the visit.
- As a Doctor , I can request internal hospital services (e.g.,lab tests, imaging, or specialist referrals), so that the patient's care plan is set before they leave.
- As a Doctor ,I can Schedule my next appointment for the patient I am seeing.

## Database Design

![alt text](<Screenshot 2026-07-22 at 3.46.54 PM.png>)

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
| POST | /appointments | Book a new appointment |
| GET | /appointments/my-appointments | View patient's past and upcoming visits |
| DELETE | /appointments/:id | Cancel an appointment |

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

- Live video streaming directly inside the app for telehealth consultations.

- Automated Notifications: Email and SMS reminders for upcoming appointments and lab test results.

- Online Payments: Integration with payment gateways (e.g., Stripe) for pre-paying consultation fees.

- Prescription Module: Electronic prescription (e-Rx) generation with direct export to PDF.

## Credits

Developed by Dr.Fatema as part of the hospital digital infrastructure initiative.

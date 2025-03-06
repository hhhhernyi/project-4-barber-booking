// all URL here begin with /book-appointment

const verifyToken = require('../middleware/verify-token');
const Appointment = require('../models/appointment')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// CREATE: this route is to create a new appointment
router.post("/", async (req, res) => {
    try {
      //req.body.customer = req.user._id; // req.user comes from the verify token method. we are saving the user id (user who is logged in) to be the agent (req.body.agent) that creates the cclients
      const newAppointment = await Appointment.create(req.body); // create the appointment model using .create() and save to a constant called newAppointment
      //newAppointment._doc.customer = req.user;
      res.status(201).json(newAppointment);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  module.exports = router;
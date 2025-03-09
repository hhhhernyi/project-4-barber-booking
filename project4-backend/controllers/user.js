// all URL here begin with /users
const verifyToken = require('../middleware/verify-token');
const User = require('../models/user')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

  router.get("/:userId", async (req, res) => {
    try {
      const userID = req.params.userId
      const oneUser = await User.findById(userID); 
      res.status(201).json(oneUser);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  module.exports = router;
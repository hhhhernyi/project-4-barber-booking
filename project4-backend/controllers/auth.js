const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const saltRounds = 12;

// ALL URL IN THIS PAGE STARTS WITH /AUTH


// this route is to sign up a new user
// steps taken:

router.post('/signup', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ email: req.body.email }); // firstly, using the user schema/model .findOne(), find if the email sent in the req.body is already present

    if (userInDatabase) {
      return res.status(409).json({ err: 'Email already taken.' }); // if username is taken, we return a 409 status
    } else { // if email is not taken, use the User schema/model .create() to create a new user with the details provided, and hash the password
        console.log(req.body);
        // save this new created user into a variable named user
        const user = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            hashedPassword: bcrypt.hashSync(req.body.password, saltRounds),
            points: 0,
            admin: req.body.admin
            });
    const payload = { email: user.email, _id: user._id }; // extract the username and id of the user and save to a variable named payload
    const token = jwt.sign({ payload }, process.env.JWT_SECRET); // create a jwt token using this payload and the secret key in the .env file
    res.status(201).json({ token }); // return this key to the user as a response when user is successfully created
    }

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


module.exports = router;
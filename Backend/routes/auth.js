const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser.js");


// Route 1:Create a user using POST "/api/auth/createUser", doesn't require authentication
router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  //to see if it is valid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //to find in user if the email already exist
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      let sucess=false;
      return res.status(400).json({ sucess, error: 'Email already exists' });
    }
    let usernam = await User.findOne({ username: req.body.username });
    if (usernam) {
      let sucess=false;
      return res.status(400).json({ sucess, error: 'Username already exists' });
    }
    //To create a user
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    let sucess=false;
    const userd = await User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hash
    });
    const data = {
      user: {
        id: userd.id
      }
    }
    const authtoken = jwt.sign(data, 'shhhhh');
    console.log(authtoken);
    sucess=true;
    res.json({ sucess, authtoken });
  } catch (error) {
    let sucess=false;
    console.error(error.message);
    res.status(500).json({ sucess,error: 'Server error' });
  }
});

//Route 2:login

router.post('/login', [
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  //to see if it is valid
  const errors = validationResult(req);
  let sucess=false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //to find in user if the email already exist
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      let sucess=false;
      return res.status(400).json({ sucess, error: 'Wrong credentials' });
    }
    let username = await User.findOne({ username: req.body.username });
    if (!username) {
      let sucess=false;
      return res.status(400).json({ sucess, error: 'Wrong credentials' });
    }

    let password = await bcrypt.hash(req.body.password, 10)
    if (!password) {
      let sucess=false;
      return res.status(400).json({ sucess, error: 'Wrong credentials' });
      
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, 'shhhhh');
    sucess=true;
    console.log(authtoken);
    res.json({ sucess, authtoken });
  } catch (error) {
    let sucess=false;
    console.error(error.message);
    res.status(500).json({ sucess, error: 'Server error' });
  }
});


//Route 3: getuser
router.post('/getUser', fetchUser, async (req, res) => {
  try {
    //comes from the token from fetchuser
    let userid = req.user.id;
    //user
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;

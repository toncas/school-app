const passport = require('passport');
const Auth = require('../models/Auth');
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { email, password, userType, name } = req.body;
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newAuth = new Auth({ email, password, userType });
    await newAuth.save();

    const newUser = new User({ authId: newAuth._id, name, userType });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login controller
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
};
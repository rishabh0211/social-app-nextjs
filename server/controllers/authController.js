const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');

exports.validateSignup = (req, res, next) => {
  req.sanitizeBody('name');
  req.sanitizeBody('email');
  req.sanitizeBody('password');

  // Name is not null and is 4-10 characters long
  req.checkBody('name', 'Enter a name').notEmpty();
  req.checkBody('name', 'Name must between 4 and 10 characters')
    .isLength({min: 4, max: 10});

  // Email is not null, valid and normalized
  req.checkBody('email', 'Enter a valid email')
    .isEmail()
    .normalizeEmail();

  req.checkBody('password', 'Enter a Password').notEmpty();
  req.checkBody('password', 'Password must between 4 and 10 characters')
    .isLength({min: 4, max: 10});

  const errors = req.validationErrors();
  if(errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).send(firstError);
  }
  next();
};

exports.signup = async (req, res) => {
  const {name, email, password} = req.body;
  const user = await new User({name, email, password});
  await User.register(user, password, (err, user) => {
    if (err) {
      return res.status(500).send(e);
    }
    res.json(user.name);
  });
};

exports.signin = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    if(!user) {
      return res.status(400).json(info.message);
    }
    req.logIn(user, err => {
      if (err) {
        return res.status(500).json(err.message);
      }
      res.json(user);
    });
  })(req, res, next);
};

exports.signout = async(req, res) => {
  res.clearCookie("next-connect.sid");
  req.logout();
  res.json({ message: "You are now signed out"});
};

exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
};

const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const Users = require('../models/user.model');
const passport = require('passport');
const bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const cookieExtractor = (req, res) =>{
  let token = null;
  if(req && req.cookies){
    token = req.cookies["access_token"];
  }
  return token;
}

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: "zetta"
}

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
  Users.findById({_id: payload.sub}, (err, user) => {
    if (err) {
      return done(err, false);
    }
    
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
  Users.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    } else if (!user) {
      return done(null, false, { message: 'Sai email', message_en: 'Incorrect email' });
    } else {
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          return done(err);
        } else if (!match) {
          return done(null, false, {message: 'Sai mật khẩu', message_en: 'Incorrect password'});
        } else {
          return done(null, user);
        }
      })
    };
  });
}));